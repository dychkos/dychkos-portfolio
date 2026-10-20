import GithubSlugger from 'github-slugger';

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export const TOC_SKIP_IDS = ['table-of-contents', 'зміст'];

function stripInline(raw: string): string {
  return raw
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/`+([^`]*)`+/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/(^|\s)_([^_]+)_(?=\s|$)/g, '$1$2')
    .trim();
}

export function extractHeadings(mdx: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const result: TocHeading[] = [];
  let fence: string | null = null;

  for (const line of mdx.split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1];
      else if (fence === fenceMatch[1]) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const level = match[1].length;
    const text = stripInline(match[2]);
    const id = slugger.slug(text);
    if ((level === 2 || level === 3) && !TOC_SKIP_IDS.includes(id)) {
      result.push({ id, text, level });
    }
  }
  return result;
}
