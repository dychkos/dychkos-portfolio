import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PHONE_RAW, PHONE_GROUPS } from '../lib/site/phone.ts';

test('groups join back to the raw number', () => {
  assert.equal(PHONE_RAW, '+380734042536');
  assert.equal(PHONE_GROUPS.map((g) => g.text).join(''), PHONE_RAW);
  assert.equal(PHONE_GROUPS.map((g) => g.text).join(' '), '+380 73 404 25 36');
});

test('eggs sit on 404, 25 and 36 only', () => {
  assert.deepEqual(
    PHONE_GROUPS.map((g) => g.egg ?? null),
    [null, null, 'not found', '5²', '6²']
  );
});
