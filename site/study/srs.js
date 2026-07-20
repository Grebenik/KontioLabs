/* =============================================================================
   KONTIO LABS — Spaced Repetition Study System (SRS) core engine.
   Vanilla JS, global namespace (window.SRS). No dependencies, no build step.
   Progress lives in localStorage under "srs_progress", settings under
   "srs_settings"; when storage is unavailable (private browsing) an in-memory
   fallback keeps the session working (SRS.storageAvailable exposes the state).
   ============================================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'srs_progress';
  var SETTINGS_KEY = 'srs_settings';
  var MAX_INTERVAL_DAYS = 180;
  var MIN_EASE = 1.3;
  var DEFAULT_EASE = 2.5;
  var LEARNED_INTERVAL_DAYS = 21; /* card counts as "learned" at 21+ day interval */
  var DEFAULT_NEW_PER_DAY = 20;   /* new-card introduction cap per topic per day */

  var SRS = window.SRS = window.SRS || {};

  /* ---------------------------------------------------------------------------
     Storage — all reads/writes go through getProgress()/saveProgress().
     --------------------------------------------------------------------------- */
  var memoryStore = null;    /* fallback when localStorage is unavailable */
  var memorySettings = null;

  function detectStorage() {
    try {
      var k = '__srs_test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }
  SRS.storageAvailable = detectStorage();

  SRS.getProgress = function () {
    if (!SRS.storageAvailable) {
      if (!memoryStore) memoryStore = { topics: {} };
      return memoryStore;
    }
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : null;
      if (!data || typeof data !== 'object' || !data.topics) data = { topics: {} };
      return data;
    } catch (e) {
      return { topics: {} };
    }
  };

  SRS.saveProgress = function (progress) {
    if (!SRS.storageAvailable) { memoryStore = progress; return; }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) { /* quota/private mode — keep going without persistence */ }
  };

  SRS.getSettings = function () {
    var defaults = { newPerDay: DEFAULT_NEW_PER_DAY };
    if (!SRS.storageAvailable) return memorySettings || defaults;
    try {
      var raw = window.localStorage.getItem(SETTINGS_KEY);
      var s = raw ? JSON.parse(raw) : null;
      if (!s || typeof s.newPerDay !== 'number' || s.newPerDay < 0) return defaults;
      return s;
    } catch (e) {
      return defaults;
    }
  };

  SRS.saveSettings = function (settings) {
    if (!SRS.storageAvailable) { memorySettings = settings; return; }
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) { /* non-fatal */ }
  };

  SRS.getCardState = function (topicId, cardId) {
    var p = SRS.getProgress();
    return (p.topics[topicId] && p.topics[topicId][cardId]) || null;
  };

  SRS.setCardState = function (topicId, cardId, state) {
    var p = SRS.getProgress();
    if (!p.topics[topicId]) p.topics[topicId] = {};
    p.topics[topicId][cardId] = state;
    SRS.saveProgress(p);
  };

  SRS.deleteCardState = function (topicId, cardId) {
    var p = SRS.getProgress();
    if (p.topics[topicId]) {
      delete p.topics[topicId][cardId];
      SRS.saveProgress(p);
    }
  };

  /* Wipe all progress (and today's new-card count) for one topic. */
  SRS.resetTopic = function (topicId) {
    var p = SRS.getProgress();
    delete p.topics[topicId];
    if (p.newIntroduced && p.newIntroduced.byTopic) {
      delete p.newIntroduced.byTopic[topicId];
    }
    SRS.saveProgress(p);
  };

  /* ---------------------------------------------------------------------------
     Dates — local-time calendar days as "YYYY-MM-DD" strings.
     --------------------------------------------------------------------------- */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  SRS.todayStr = function () {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  };

  SRS.addDays = function (dateStr, days) {
    var parts = dateStr.split('-');
    var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  };

  /* ---------------------------------------------------------------------------
     Daily new-card introduction counter. Only today's tally is kept; the
     structure resets automatically when the date rolls over.
     --------------------------------------------------------------------------- */
  function newIntroToday(progress) {
    var today = SRS.todayStr();
    if (!progress.newIntroduced || progress.newIntroduced.date !== today) {
      progress.newIntroduced = { date: today, byTopic: {} };
    }
    return progress.newIntroduced;
  }

  SRS.newIntroducedToday = function (topicId) {
    var p = SRS.getProgress();
    var intro = newIntroToday(p);
    return intro.byTopic[topicId] || 0;
  };

  /* How many new cards may still be introduced today for a topic. */
  SRS.newAllowanceLeft = function (topicId) {
    var limit = SRS.getSettings().newPerDay;
    return Math.max(0, limit - SRS.newIntroducedToday(topicId));
  };

  /* ---------------------------------------------------------------------------
     SM-2 (simplified). Ratings: 1 Again, 2 Hard, 3 Good, 4 Easy.
     First Good repetition = 1 day, second = 4 days, then interval × easeFactor.
     Pure function — no storage side effects.
     --------------------------------------------------------------------------- */
  SRS.review = function (state, rating) {
    var s = state || {};
    var interval = typeof s.interval === 'number' ? s.interval : 0;
    var ease = typeof s.easeFactor === 'number' ? s.easeFactor : DEFAULT_EASE;
    var reps = typeof s.repetitions === 'number' ? s.repetitions : 0;

    if (rating === 1) {            /* Again — reset */
      interval = 1;
      reps = 0;
    } else if (rating === 2) {     /* Hard */
      ease = Math.max(MIN_EASE, ease - 0.15);
      interval = Math.max(1, interval) * 1.2;
      reps += 1;
    } else if (rating === 3) {     /* Good — standard SM-2 steps */
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 4;
      else interval = interval * ease;
    } else {                       /* Easy */
      ease = ease + 0.15;
      interval = Math.max(1, interval) * ease * 1.3;
      reps += 1;
    }

    interval = Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(interval)));
    return {
      interval: interval,
      easeFactor: Math.round(ease * 100) / 100,
      repetitions: reps,
      dueDate: SRS.addDays(SRS.todayStr(), interval)
    };
  };

  /* Apply a rating: compute + persist the new state, tracking new-card intros.
     Returns { prevState, newState, wasNew } so the caller can undo. */
  SRS.applyReview = function (topicId, cardId, rating) {
    var prevState = SRS.getCardState(topicId, cardId);
    var wasNew = !prevState;
    var newState = SRS.review(prevState, rating);
    var p = SRS.getProgress();
    if (!p.topics[topicId]) p.topics[topicId] = {};
    p.topics[topicId][cardId] = newState;
    if (wasNew) {
      var intro = newIntroToday(p);
      intro.byTopic[topicId] = (intro.byTopic[topicId] || 0) + 1;
    }
    SRS.saveProgress(p);
    return { prevState: prevState, newState: newState, wasNew: wasNew };
  };

  /* Undo a review recorded by applyReview. */
  SRS.undoReview = function (topicId, cardId, prevState, wasNew) {
    var p = SRS.getProgress();
    if (!p.topics[topicId]) p.topics[topicId] = {};
    if (prevState) p.topics[topicId][cardId] = prevState;
    else delete p.topics[topicId][cardId];
    if (wasNew) {
      var intro = newIntroToday(p);
      intro.byTopic[topicId] = Math.max(0, (intro.byTopic[topicId] || 0) - 1);
    }
    SRS.saveProgress(p);
  };

  /* ---------------------------------------------------------------------------
     Topic registry + manifest loader. Topic files call SRS.registerTopic(...)
     and manifest.js sets SRS.manifest = ["topics/foo.js", ...].
     --------------------------------------------------------------------------- */
  var topics = [];
  var topicsById = {};

  SRS.registerTopic = function (topic) {
    if (!topic || !topic.id || topicsById[topic.id]) return;
    topicsById[topic.id] = topic;
    topics.push(topic);
  };

  SRS.getTopics = function () { return topics.slice(); };
  SRS.getTopic = function (id) { return topicsById[id] || null; };

  /* Loads every script listed in SRS.manifest, then calls done(). */
  SRS.loadTopics = function (done) {
    var files = SRS.manifest || [];
    var remaining = files.length;
    if (!remaining) { done(); return; }
    files.forEach(function (src) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = s.onerror = function () { if (--remaining === 0) done(); };
      document.head.appendChild(s);
    });
  };

  /* ---------------------------------------------------------------------------
     Due-card selection and per-topic stats.
     "Due" = review cards whose dueDate has arrived, plus unseen (new) cards
     up to the remaining daily new-card allowance.
     --------------------------------------------------------------------------- */
  SRS.dueBreakdown = function (topic) {
    var p = SRS.getProgress();
    var states = p.topics[topic.id] || {};
    var today = SRS.todayStr();
    var reviews = [];
    var newCards = [];
    topic.cards.forEach(function (card) {
      var st = states[card.id];
      if (!st) newCards.push(card);
      else if (st.dueDate <= today) reviews.push(card);
    });
    return { reviews: reviews, newCards: newCards };
  };

  /* Cards for today's session: all due reviews + allowance-limited new cards. */
  SRS.dueCards = function (topic) {
    var b = SRS.dueBreakdown(topic);
    var allowance = SRS.newAllowanceLeft(topic.id);
    return b.reviews.concat(b.newCards.slice(0, allowance));
  };

  SRS.topicStats = function (topic) {
    var p = SRS.getProgress();
    var states = p.topics[topic.id] || {};
    var b = SRS.dueBreakdown(topic);
    var allowance = SRS.newAllowanceLeft(topic.id);
    var learned = 0;
    topic.cards.forEach(function (card) {
      var st = states[card.id];
      if (st && st.interval >= LEARNED_INTERVAL_DAYS) learned++;
    });
    return {
      total: topic.cards.length,
      due: b.reviews.length + Math.min(b.newCards.length, allowance),
      newCards: b.newCards.length,
      learned: learned
    };
  };
})();
