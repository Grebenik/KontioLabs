/* Minimal, dependency-free test harness shared by the study-system test
   scripts. Matches the project's "no build step, no dependencies" rule
   (see srs.js header) — plain Node, plain assert, no test framework install. */
'use strict';
const assert = require('assert');

let pass = 0;
let fail = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    pass++;
    console.log('  ok  - ' + name);
  } catch (err) {
    fail++;
    failures.push({ name, err });
    console.log('  FAIL - ' + name);
    console.log('        ' + err.message);
  }
}

function summarize(suiteName) {
  console.log('');
  console.log(suiteName + ': ' + pass + ' passed, ' + fail + ' failed');
  if (fail > 0) process.exitCode = 1;
  return { pass, fail, failures };
}

/* A tiny in-memory localStorage-compatible object for loading srs.js under Node. */
function makeLocalStorageShim() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: (k) => { store.delete(k); },
    clear: () => store.clear()
  };
}

module.exports = { test, summarize, assert, makeLocalStorageShim };
