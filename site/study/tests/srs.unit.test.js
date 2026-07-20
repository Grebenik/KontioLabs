/* Unit tests for srs.js — the SM-2 scheduling engine, undo support, settings
   and daily new-card allowance. Plain Node, no dependencies.
   Run: node site/study/tests/srs.unit.test.js */
'use strict';
const path = require('path');
const { test, summarize, assert, makeLocalStorageShim } = require('./test-harness');

/* srs.js is written as a browser IIFE (window.SRS = window.SRS || {}); load it
   under Node by shimming window + localStorage before requiring it. */
global.window = global;
global.localStorage = makeLocalStorageShim();
delete require.cache[require.resolve('../srs.js')];
require('../srs.js');
const SRS = global.SRS;

console.log('srs.unit.test.js');

test('storage is available under the shim', () => {
  assert.strictEqual(SRS.storageAvailable, true);
});

test('todayStr returns YYYY-MM-DD', () => {
  assert.match(SRS.todayStr(), /^\d{4}-\d{2}-\d{2}$/);
});

test('addDays advances the calendar date, including month/year rollover', () => {
  assert.strictEqual(SRS.addDays('2026-01-31', 1), '2026-02-01');
  assert.strictEqual(SRS.addDays('2026-12-31', 1), '2027-01-01');
  assert.strictEqual(SRS.addDays('2026-07-01', 30), '2026-07-31');
});

test('review(): first three "Good" ratings follow 1 / 4 / interval*ease', () => {
  let state = null;
  state = SRS.review(state, 3); assert.strictEqual(state.interval, 1);
  state = SRS.review(state, 3); assert.strictEqual(state.interval, 4);
  state = SRS.review(state, 3);
  // easeFactor is unchanged by "Good", so the 3rd interval must be round(4 * 2.5) = 10
  assert.strictEqual(state.interval, 10);
  assert.strictEqual(state.easeFactor, 2.5);
});

test('review(): "Again" resets interval to 1 and repetitions to 0', () => {
  let state = { interval: 30, easeFactor: 2.6, repetitions: 4 };
  state = SRS.review(state, 1);
  assert.strictEqual(state.interval, 1);
  assert.strictEqual(state.repetitions, 0);
  assert.strictEqual(state.easeFactor, 2.6, 'Again should not change ease');
});

test('review(): "Hard" lowers ease by 0.15 down to a floor of 1.3', () => {
  let state = { interval: 10, easeFactor: 1.4, repetitions: 3 };
  state = SRS.review(state, 2);
  assert.strictEqual(state.easeFactor, 1.3);
  state = SRS.review(state, 2); // already at floor, must not go below it
  assert.strictEqual(state.easeFactor, 1.3);
});

test('review(): "Easy" raises ease by 0.15 and grows the interval faster than "Good"', () => {
  const base = { interval: 10, easeFactor: 2.5, repetitions: 3 };
  const good = SRS.review(base, 3);
  const easy = SRS.review(base, 4);
  assert.strictEqual(easy.easeFactor, 2.65);
  assert.ok(easy.interval > good.interval, 'Easy interval should exceed Good interval from the same state');
});

test('review(): interval is capped at 180 days', () => {
  const state = SRS.review({ interval: 170, easeFactor: 2.8, repetitions: 10 }, 4);
  assert.ok(state.interval <= 180, 'interval must not exceed the 180-day cap');
});

test('review(): dueDate is todayStr() + interval days', () => {
  const state = SRS.review(null, 3); // Good, first rep -> interval 1
  assert.strictEqual(state.dueDate, SRS.addDays(SRS.todayStr(), state.interval));
});

test('applyReview() persists state and marks new-card introduction once', () => {
  const topic = 't-unit-1', card = 'c1';
  const before = SRS.newIntroducedToday(topic);
  const rec = SRS.applyReview(topic, card, 3);
  assert.strictEqual(rec.wasNew, true);
  assert.strictEqual(SRS.newIntroducedToday(topic), before + 1);
  const stored = SRS.getCardState(topic, card);
  assert.strictEqual(stored.interval, 1);

  // reviewing the same (now-existing) card again must NOT count as a new intro
  const rec2 = SRS.applyReview(topic, card, 3);
  assert.strictEqual(rec2.wasNew, false);
  assert.strictEqual(SRS.newIntroducedToday(topic), before + 1);
});

test('undoReview() restores prior state and decrements new-card count when undoing a new card', () => {
  const topic = 't-unit-2', card = 'c1';
  const introBefore = SRS.newIntroducedToday(topic);
  const rec = SRS.applyReview(topic, card, 4); // Easy, was new
  assert.strictEqual(SRS.newIntroducedToday(topic), introBefore + 1);

  SRS.undoReview(topic, card, rec.prevState, rec.wasNew);
  assert.strictEqual(SRS.getCardState(topic, card), null, 'undoing the only review should remove the card state entirely');
  assert.strictEqual(SRS.newIntroducedToday(topic), introBefore);
});

test('undoReview() restores the previous (non-null) state for a card reviewed twice', () => {
  const topic = 't-unit-3', card = 'c1';
  const rec1 = SRS.applyReview(topic, card, 3); // new -> interval 1
  const rec2 = SRS.applyReview(topic, card, 3); // existing -> interval 4
  assert.strictEqual(SRS.getCardState(topic, card).interval, 4);

  SRS.undoReview(topic, card, rec2.prevState, rec2.wasNew);
  const restored = SRS.getCardState(topic, card);
  assert.strictEqual(restored.interval, rec1.newState.interval, 'undo should roll back to the pre-2nd-review state, not delete it');
});

test('getSettings() defaults newPerDay to 20 and saveSettings()/getSettings() round-trip', () => {
  assert.strictEqual(SRS.getSettings().newPerDay, 20);
  SRS.saveSettings({ newPerDay: 5 });
  assert.strictEqual(SRS.getSettings().newPerDay, 5);
  SRS.saveSettings({ newPerDay: 20 }); // restore default for later tests
});

test('newAllowanceLeft() respects the daily settings cap and today\'s intro count', () => {
  const topic = 't-unit-4';
  SRS.saveSettings({ newPerDay: 2 });
  assert.strictEqual(SRS.newAllowanceLeft(topic), 2);
  SRS.applyReview(topic, 'a', 3);
  assert.strictEqual(SRS.newAllowanceLeft(topic), 1);
  SRS.applyReview(topic, 'b', 3);
  assert.strictEqual(SRS.newAllowanceLeft(topic), 0);
  SRS.applyReview(topic, 'c', 3); // over the cap is still recorded...
  assert.strictEqual(SRS.newAllowanceLeft(topic), 0, '...but allowance never goes negative');
  SRS.saveSettings({ newPerDay: 20 });
});

test('resetTopic() clears saved card states and the topic\'s new-card counter', () => {
  const topic = 't-unit-5';
  SRS.applyReview(topic, 'x', 3);
  assert.ok(SRS.getCardState(topic, 'x'));
  assert.ok(SRS.newIntroducedToday(topic) >= 1);
  SRS.resetTopic(topic);
  assert.strictEqual(SRS.getCardState(topic, 'x'), null);
  assert.strictEqual(SRS.newIntroducedToday(topic), 0);
});

test('dueCards()/dueBreakdown()/topicStats() combine review-due and allowance-limited new cards', () => {
  const topic = { id: 't-unit-6', cards: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] };
  SRS.resetTopic(topic.id);
  SRS.saveSettings({ newPerDay: 1 });

  // 'a' is due today (interval already elapsed); 'b' and 'c' are unseen (new).
  SRS.setCardState(topic.id, 'a', { interval: 1, easeFactor: 2.5, repetitions: 1, dueDate: SRS.todayStr() });

  const breakdown = SRS.dueBreakdown(topic);
  assert.strictEqual(breakdown.reviews.length, 1);
  assert.strictEqual(breakdown.newCards.length, 2);

  const due = SRS.dueCards(topic);
  assert.strictEqual(due.length, 2, '1 due review + newPerDay(1) new card, capped');

  const stats = SRS.topicStats(topic);
  assert.strictEqual(stats.total, 3);
  assert.strictEqual(stats.due, 2);
  assert.strictEqual(stats.newCards, 2);

  SRS.saveSettings({ newPerDay: 20 });
  SRS.resetTopic(topic.id);
});

test('registerTopic()/getTopic()/getTopics() register and look up topics, ignoring duplicate ids', () => {
  SRS.registerTopic({ id: 't-unit-reg', cards: [] });
  SRS.registerTopic({ id: 't-unit-reg', cards: [{ id: 'should-be-ignored' }] });
  const topic = SRS.getTopic('t-unit-reg');
  assert.ok(topic);
  assert.strictEqual(topic.cards.length, 0, 'second registerTopic() call with the same id must be ignored');
  assert.ok(SRS.getTopics().some((t) => t.id === 't-unit-reg'));
});

const result = summarize('srs.unit.test.js');
if (require.main === module && result.fail === 0) {
  console.log('All srs.js unit tests passed.');
}
