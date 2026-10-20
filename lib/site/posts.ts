export function groupPostsByYear<T extends { date: string }>(
  posts: T[]
): { year: string; posts: T[] }[] {
  const groups: { year: string; posts: T[] }[] = [];
  for (const post of posts) {
    const year = String(new Date(post.date).getUTCFullYear());
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.posts.push(post);
    else groups.push({ year, posts: [post] });
  }
  return groups;
}

export function getAdjacentPosts<T extends { slug: string }>(
  posts: T[],
  slug: string
): { newer: T | null; older: T | null } {
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function formatPostDate(
  date: string,
  locale: 'en' | 'ua',
  withYear: boolean
): string {
  return new Date(date).toLocaleDateString(
    locale === 'ua' ? 'uk-UA' : 'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: withYear ? 'numeric' : undefined,
      timeZone: 'UTC',
    }
  );
}
