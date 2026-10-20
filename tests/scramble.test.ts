import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrambleFrame, SCRAMBLE_CHARS } from '../lib/site/scramble.ts';

const zero = () => 0;

test('last step is the target text', () => {
  assert.equal(scrambleFrame('404', 'not found', 10, 10, zero), 'not found');
  assert.equal(scrambleFrame('not found', '404', 10, 10, zero), '404');
});

test('first step is all scramble characters, spaces kept', () => {
  const f = scrambleFrame('404', 'not found', 0, 10, zero);
  assert.equal(f.length, 9);
  assert.equal(f[3], ' ');
  for (const [i, ch] of [...f].entries())
    if (i !== 3) assert.ok(SCRAMBLE_CHARS.includes(ch));
});

test('settled prefix grows with the step', () => {
  const f = scrambleFrame('404', 'not found', 5, 10, zero);
  assert.ok(f.startsWith('not '));
});
