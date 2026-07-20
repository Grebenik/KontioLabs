/* Runs every test script in this directory and exits non-zero if any fail.
   Run: node site/study/tests/run-all.js */
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');

const suites = ['srs.unit.test.js', 'topics.structure.test.js'];
let failed = false;

suites.forEach((file) => {
  console.log('='.repeat(60));
  try {
    execFileSync(process.execPath, [path.join(__dirname, file)], { stdio: 'inherit' });
  } catch (e) {
    failed = true;
  }
});

console.log('='.repeat(60));
if (failed) {
  console.log('One or more test suites FAILED.');
  process.exit(1);
} else {
  console.log('All test suites passed.');
}
