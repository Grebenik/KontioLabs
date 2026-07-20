/* Structural / integration test for the topic decks and manifest wiring.
   This is the site's stand-in for browser E2E: the project is a pure static
   site with no build step and no test-runner dependency (see srs.js header),
   so rather than pull in a browser-automation framework, this script exercises
   the exact same code path the pages use — srs.js + manifest.js + every topic
   file, loaded and registered for real — and checks the invariants both
   index.html (topic picker) and session.html (study session) rely on.
   Run: node site/study/tests/topics.structure.test.js */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, summarize, assert, makeLocalStorageShim } = require('./test-harness');

const studyDir = path.join(__dirname, '..');
const topicsDir = path.join(studyDir, 'topics');

/* Build one shared sandbox and load srs.js, manifest.js, then every manifest
   entry into it — the same order session.html/index.html load them via
   SRS.loadTopics(), except done synchronously with vm instead of <script src>. */
const sandbox = { console };
sandbox.window = sandbox;
sandbox.localStorage = makeLocalStorageShim();
vm.createContext(sandbox);

function loadScriptIntoSandbox(absPath) {
  const code = fs.readFileSync(absPath, 'utf8');
  vm.runInContext(code, sandbox, { filename: absPath });
}

loadScriptIntoSandbox(path.join(studyDir, 'srs.js'));
loadScriptIntoSandbox(path.join(topicsDir, 'manifest.js'));

const manifest = sandbox.SRS.manifest;

console.log('topics.structure.test.js');

test('manifest.js exports a non-empty array of topic file paths', () => {
  assert.ok(Array.isArray(manifest) && manifest.length > 0);
});

test('every manifest entry points to a topic file that actually exists on disk', () => {
  manifest.forEach((rel) => {
    const abs = path.join(studyDir, rel);
    assert.ok(fs.existsSync(abs), rel + ' is listed in manifest.js but the file is missing');
  });
});

test('every .js file in topics/ (except manifest.js) is listed in the manifest', () => {
  const files = fs.readdirSync(topicsDir).filter((f) => f.endsWith('.js') && f !== 'manifest.js');
  files.forEach((f) => {
    const rel = 'topics/' + f;
    assert.ok(manifest.indexOf(rel) !== -1, f + ' exists in topics/ but is not referenced in manifest.js');
  });
});

/* Load every manifest-listed topic file for real, exactly as loadTopics() would. */
manifest.forEach((rel) => loadScriptIntoSandbox(path.join(studyDir, rel)));

const topics = sandbox.SRS.getTopics();

test('every manifest entry successfully registered a topic', () => {
  assert.strictEqual(topics.length, manifest.length, 'registered topic count must match manifest length (no silent load failures, no duplicate ids swallowed)');
});

test('every topic has a unique, non-empty id, name, and description', () => {
  const ids = new Set();
  topics.forEach((t) => {
    assert.ok(t.id && typeof t.id === 'string', 'topic missing a string id');
    assert.ok(!ids.has(t.id), 'duplicate topic id: ' + t.id);
    ids.add(t.id);
    assert.ok(t.name && typeof t.name === 'string', t.id + ' missing a name');
    assert.ok(typeof t.description === 'string' && t.description.length > 0, t.id + ' missing a description');
  });
});

test('every topic has a non-empty cards array', () => {
  topics.forEach((t) => {
    assert.ok(Array.isArray(t.cards) && t.cards.length > 0, t.id + ' has no cards');
  });
});

test('every card has a unique id (within its topic) and non-empty front/back text', () => {
  topics.forEach((t) => {
    const ids = new Set();
    t.cards.forEach((c) => {
      assert.ok(c.id && typeof c.id === 'string', t.id + ': card missing a string id');
      assert.ok(!ids.has(c.id), t.id + ': duplicate card id "' + c.id + '"');
      ids.add(c.id);
      assert.ok(typeof c.front === 'string' && c.front.trim().length > 0, t.id + '/' + c.id + ': empty front');
      assert.ok(typeof c.back === 'string' && c.back.trim().length > 0, t.id + '/' + c.id + ': empty back');
    });
  });
});

test('no two cards within the same topic share identical front text (likely a copy-paste dupe)', () => {
  topics.forEach((t) => {
    const seen = new Map();
    t.cards.forEach((c) => {
      if (seen.has(c.front)) {
        throw new Error(t.id + ': "' + c.front + '" appears on both ' + seen.get(c.front) + ' and ' + c.id);
      }
      seen.set(c.front, c.id);
    });
  });
});

test('SRS.topicStats()/dueCards() run cleanly against every real topic (smoke test of index.html/session.html data path)', () => {
  topics.forEach((t) => {
    const stats = sandbox.SRS.topicStats(t);
    assert.strictEqual(stats.total, t.cards.length);
    const due = sandbox.SRS.dueCards(t);
    assert.ok(Array.isArray(due));
    assert.ok(due.length <= t.cards.length);
  });
});

test('required expansion/new decks from the study-content plan are present', () => {
  const expectedIds = [
    'web-fundamentals', 'anthropic-architecture', 'ai-general', 'cybersecurity',
    'networking', 'nist-csf', 'finnish-numbers', 'finnish-500-words', 'finnish-500-nouns'
  ];
  const gotIds = new Set(topics.map((t) => t.id));
  expectedIds.forEach((id) => assert.ok(gotIds.has(id), 'expected topic "' + id + '" to be registered'));
});

test('web-fundamentals deck has close to the targeted ~100 cards', () => {
  const t = sandbox.SRS.getTopic('web-fundamentals');
  assert.ok(t.cards.length >= 90, 'expected roughly 100 cards, got ' + t.cards.length);
});

test('finnish-500-words and finnish-500-nouns decks each have close to the targeted 500 cards', () => {
  ['finnish-500-words', 'finnish-500-nouns'].forEach((id) => {
    const t = sandbox.SRS.getTopic(id);
    assert.ok(t.cards.length >= 400, id + ' expected roughly 500 cards, got ' + t.cards.length);
  });
});

const result = summarize('topics.structure.test.js');
if (require.main === module && result.fail === 0) {
  console.log('All topic/manifest structural tests passed.');
}
