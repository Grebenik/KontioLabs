/* =============================================================================
   KONTIO LABS — Spaced Repetition Study System (SRS) core engine.
   Vanilla JS, global namespace (window.SRS). No dependencies, no build step.
   Progress lives in localStorage under the key "srs_progress"; when storage is
   unavailable (private browsing) an in-memory fallback keeps the session
   working and the UI shows a warning via SRS.storageAvailable.
   ============================================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'srs_progress';
  var MAX_INTERVAL_DAYS = 180;
  var MIN_EASE = 1.3;
  var DEFAULT_EASE = 2.5;
  var LEARNED_INTERVAL_DAYS = 21; /* card counts as "learned" at 21+ day interval */

  var SRS = window.SRS = window.SRS || {};

  /* ---------------------------------------------------------------------------
     Storage — all reads/writes go through getProgress()/saveProgress().
     --------------------------------------------------------------------------- */
  var memoryStore = null; /* fallback when localStorage is unavailable */

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
     SM-2 (simplified). Ratings: 1 Again, 2 Hard, 3 Good, 4 Easy.
     First Good repetition = 1 day, second = 4 days, then interval × easeFactor.
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
     Per-topic stats for the picker page.
     --------------------------------------------------------------------------- */
  SRS.topicStats = function (topic) {
    var p = SRS.getProgress();
    var states = p.topics[topic.id] || {};
    var today = SRS.todayStr();
    var stats = { total: topic.cards.length, due: 0, newCards: 0, learned: 0 };
    topic.cards.forEach(function (card) {
      var st = states[card.id];
      if (!st) { stats.newCards++; stats.due++; return; }
      if (st.dueDate <= today) stats.due++;
      if (st.interval >= LEARNED_INTERVAL_DAYS) stats.learned++;
    });
    return stats;
  };

  /* Cards due right now for a topic (new cards count as due). */
  SRS.dueCards = function (topic) {
    var p = SRS.getProgress();
    var states = p.topics[topic.id] || {};
    var today = SRS.todayStr();
    return topic.cards.filter(function (card) {
      var st = states[card.id];
      return !st || st.dueDate <= today;
    });
  };
})();
