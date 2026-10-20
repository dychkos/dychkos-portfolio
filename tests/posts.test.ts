import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  groupPostsByYear,
  getAdjacentPosts,
  formatPostDate,
} from '../lib/site/posts.ts';

test('groupPostsByYear groups by year and keeps order', () => {
  const a = { date: '2026-09-20' };
  const b = { date: '2025-11-22' };
  const c = { date: '2025-10-19' };
  assert.deepEqual(groupPostsByYear([a, b, c]), [
    { year: '2026', posts: [a] },
    { year: '2025', posts: [b, c] },
  ]);
  assert.deepEqual(groupPostsByYear([]), []);
});

test('getAdjacentPosts', () => {
  const a = { slug: 'a' };
  const b = { slug: 'b' };
  const c = { slug: 'c' };
  const list = [a, b, c];
  assert.deepEqual(getAdjacentPosts(list, 'b'), { newer: a, older: c });
  assert.deepEqual(getAdjacentPosts(list, 'a'), { newer: null, older: b });
  assert.deepEqual(getAdjacentPosts(list, 'c'), { newer: b, older: null });
  assert.deepEqual(getAdjacentPosts(list, 'zzz'), { newer: null, older: null });
  assert.deepEqual(getAdjacentPosts([a], 'a'), { newer: null, older: null });
});

test('formatPostDate', () => {
  assert.equal(formatPostDate('2026-09-20', 'en', false), 'Sep 20');
  assert.equal(formatPostDate('2026-09-20', 'en', true), 'Sep 20, 2026');
  assert.equal(formatPostDate('2026-01-01', 'en', true), 'Jan 1, 2026');
});
