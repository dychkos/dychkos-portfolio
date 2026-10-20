import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activationLine, pickActiveId } from '../lib/site/scrollSpy.ts';

const ids = ['a', 'b', 'c'];

test('empty list gives null', () => {
  assert.equal(pickActiveId([], [], 400, false), null);
  assert.equal(pickActiveId([], [], 400, true), null);
});

test('before the first entry reaches the line, nothing is active', () => {
  assert.equal(pickActiveId(ids, [500, 900, 1400], 400, false), null);
});

test('first entry once its top is at the line', () => {
  assert.equal(pickActiveId(ids, [400, 900, 1400], 400, false), 'a');
  assert.equal(pickActiveId(ids, [100, 900, 1400], 400, false), 'a');
});

test('middle entry: last one at or above the line', () => {
  assert.equal(pickActiveId(ids, [-600, 120, 700], 400, false), 'b');
});

test('past the last entry keeps the last one', () => {
  assert.equal(pickActiveId(ids, [-2000, -1200, -300], 400, false), 'c');
});

test('at the bottom the last entry wins even below the line', () => {
  assert.equal(pickActiveId(ids, [-900, 200, 650], 400, true), 'c');
  assert.equal(pickActiveId(ids, [100, 300, 650], 400, true), 'c');
});

test('missing elements are skipped', () => {
  assert.equal(pickActiveId(ids, [-600, null, 700], 400, false), 'a');
  assert.equal(pickActiveId(ids, [-600, 120, null], 400, true), 'b');
  assert.equal(pickActiveId(ids, [null, null, null], 400, true), null);
});

test('activation line from the rootMargin top', () => {
  assert.equal(activationLine('-40% 0px -55% 0px', 1000), 400);
  assert.equal(activationLine('-20% 0px -70% 0px', 800), 160);
  assert.equal(activationLine('-96px 0px 0px 0px', 800), 96);
  assert.equal(activationLine('0px', 800), 0);
  assert.equal(activationLine(undefined, 1000), 400);
  assert.equal(activationLine('nonsense', 1000), 400);
});
