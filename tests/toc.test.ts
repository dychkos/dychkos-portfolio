import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractHeadings } from '../lib/site/toc.ts';

test('h2 and h3, skipping the in-article table of contents', () => {
  const md = '## Table of Contents\n\n## Security headers middleware\n\n### Content-Security-Policy\n';
  assert.deepEqual(extractHeadings(md), [
    { id: 'security-headers-middleware', text: 'Security headers middleware', level: 2 },
    { id: 'content-security-policy', text: 'Content-Security-Policy', level: 3 },
  ]);
});

test('ukrainian headings keep cyrillic ids and skip Зміст', () => {
  assert.deepEqual(extractHeadings('## Зміст\n\n## Що таке Redis\n'), [
    { id: 'що-таке-redis', text: 'Що таке Redis', level: 2 },
  ]);
});

test('ignores headings inside code fences', () => {
  const md = '```php\n## not a heading\n```\n\n## Real\n';
  assert.deepEqual(extractHeadings(md).map((h) => h.id), ['real']);
});

test('duplicate ids count every heading level, like rehype-slug', () => {
  assert.deepEqual(extractHeadings('#### Summary\n\n## Summary\n').map((h) => h.id), ['summary-1']);
});

test('inline markdown is stripped from text and id', () => {
  assert.deepEqual(extractHeadings('## Using `Redis` with [Laravel](https://laravel.com)\n'), [
    { id: 'using-redis-with-laravel', text: 'Using Redis with Laravel', level: 2 },
  ]);
});
