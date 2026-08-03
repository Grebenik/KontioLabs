/* Generates site/study/topics/russian-numbers.js — a full SRS topic deck of
   Russian cardinal (and a few ordinal) numbers — from an algorithmic
   Russian number-to-words function. Mirrors gen-finnish-numbers.js.
   Audience: learners whose known language is English; front = digits,
   back = the Russian word (with an English gloss on the vocab cards).
   Handles Russian numeral-noun agreement for "тысяча"/"миллион" (1 vs 2-4
   vs 5+/11-14 forms) and the feminine "одна"/"две" used before "тысяча".
   Run: node gen-russian-numbers.js */
'use strict';
const fs = require('fs');
const path = require('path');

const ONES = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
const TEENS = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const TENS = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
const HUNDREDS = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
const ORDINALS_1_10 = ['первый', 'второй', 'третий', 'четвёртый', 'пятый', 'шестой', 'седьмой', 'восьмой', 'девятый', 'десятый'];

function cardinal(n) {
  if (n < 0) throw new Error('negative not supported');
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  if (n < 100) {
    const tens = Math.floor(n / 10), rem = n % 10;
    return TENS[tens - 2] + (rem ? ' ' + ONES[rem] : '');
  }
  if (n < 1000) {
    const h = Math.floor(n / 100), rem = n % 100;
    return HUNDREDS[h - 1] + (rem ? ' ' + cardinal(rem) : '');
  }
  if (n < 1000000) {
    const th = Math.floor(n / 1000), rem = n % 1000;
    return thousandPhrase(th) + (rem ? ' ' + cardinal(rem) : '');
  }
  if (n < 1000000000) {
    const m = Math.floor(n / 1000000), rem = n % 1000000;
    return millionPhrase(m) + (rem ? ' ' + cardinal(rem) : '');
  }
  throw new Error('too large');
}

/* Russian pluralization class for a count n: 'one' (1, 21, 31... but not 11),
   'few' (2-4, 22-24... but not 12-14), 'many' (0, 5-20, 25-30...). */
function pluralClass(n) {
  const mod100 = n % 100, mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return 'many';
  if (mod10 === 1) return 'one';
  if (mod10 >= 2 && mod10 <= 4) return 'few';
  return 'many';
}

/* Feminine agreement: the trailing "один"/"два" in a cardinal phrase must
   become "одна"/"две" when the counted noun (тысяча) is feminine. */
function feminize(phrase) {
  return phrase.replace(/один$/, 'одна').replace(/два$/, 'две');
}

function thousandPhrase(th) {
  const cls = pluralClass(th);
  const noun = cls === 'one' ? 'тысяча' : cls === 'few' ? 'тысячи' : 'тысяч';
  if (th === 1) return noun; /* "тысяча", not "одна тысяча" */
  return feminize(cardinal(th)) + ' ' + noun;
}

function millionPhrase(m) {
  const cls = pluralClass(m);
  const noun = cls === 'one' ? 'миллион' : cls === 'few' ? 'миллиона' : 'миллионов';
  if (m === 1) return 'один ' + noun;
  return cardinal(m) + ' ' + noun; /* миллион is masculine: "два", not "две" */
}

const cards = [];
let idx = 0;
function push(front, back, note) {
  idx += 1;
  const id = 'rn-' + String(idx).padStart(3, '0');
  cards.push({ id, front, back: note ? back + '  (' + note + ')' : back });
}

/* 0-19: every number, individually. */
for (let n = 0; n <= 19; n++) push(String(n), cardinal(n));

/* 21-99: every multiple of 10, plus a representative "tens+ones" example
   for each decade so the compounding pattern is drilled without generating
   80 near-duplicate cards. */
for (let tens = 2; tens <= 9; tens++) {
  const base = tens * 10;
  push(String(base), cardinal(base));
  push(String(base + 1), cardinal(base + 1), 'pattern: tens + ones');
  push(String(base + 7), cardinal(base + 7));
}

/* Hundreds: every multiple of 100 to 900, plus a couple of compounds. */
for (let h = 1; h <= 9; h++) push(String(h * 100), cardinal(h * 100));
push('101', cardinal(101));
push('250', cardinal(250));
push('999', cardinal(999));

/* Thousands: round thousands (drilling the 1 / 2-4 / 5+ agreement forms)
   plus a couple of compounds. */
[1000, 2000, 5000, 10000, 20000, 100000].forEach((n) => push(String(n), cardinal(n)));
push('1234', cardinal(1234));
push('2026', cardinal(2026), 'this year');

/* Millions. */
[1000000, 2000000].forEach((n) => push(String(n), cardinal(n)));

/* Ordinals 1st-10th, since they're irregular/high-frequency (nominative
   masculine singular citation forms). */
ORDINALS_1_10.forEach((word, i) => push((i + 1) + '.', word, 'ordinal'));

/* A few core number-related vocabulary cards. Front = Russian word,
   back = English gloss (this deck's audience is an English speaker). */
[
  ['число', 'number (a numeric value)'],
  ['номер', 'number (an assigned digit/figure, e.g. a phone or room number)'],
  ['считать', 'to count / to calculate'],
  ['половина', 'half'],
  ['пара', 'a pair / couple'],
  ['дюжина', 'dozen'],
  ['процент', 'percent'],
  ['ноль', 'zero (as a noun/concept, not just the digit)'],
  ['плюс', 'plus'],
  ['минус', 'minus']
].forEach(([front, back]) => push(front, back, 'vocab'));

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
const cardLines = cards.map((c) =>
  `    { id: "${c.id}", front: "${esc(c.front)}", back: "${esc(c.back)}" }`
).join(',\n');

const header = `/* Topic: Russian Numbers — cardinal numbers 0-2,000,000 (with representative
   compounds so every tens/hundreds/thousands pattern is drilled, including
   the 1 / 2-4 / 5+ agreement forms of тысяча and миллион), ordinals 1st-10th,
   and core counting vocabulary.
   Audience: English-speaking learners of Russian. Front = digits, back = the
   Russian word (vocab cards also carry an English gloss).
   GENERATED by scripts/gen-russian-numbers.js — do not hand-edit; re-run the
   script instead. */
SRS.registerTopic({
  id: "russian-numbers",
  name: "Russian Numbers",
  description: "Russian cardinal numbers 0 to 2,000,000, ordinals 1st-10th, and core counting vocabulary — for English-speaking learners of Russian.",
  cards: [
${cardLines}
  ]
});
`;

const outPath = path.join(__dirname, '..', 'topics', 'russian-numbers.js');
fs.writeFileSync(outPath, header, 'utf8');
console.log('Wrote', cards.length, 'cards to', outPath);
