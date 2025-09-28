import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Locale } from '@/lib/i18n';

export interface BlogPostMetadata {
  title: string;
  date: string;
  readingTime: number;
  tags?: string[];
  author?: string;
  slug: string;
  locale: Locale;
  description: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getBlogDirectory(locale: Locale): string {
  return path.join(process.cwd(), 'locales', 'blog', locale);
}

function getMDXFiles(locale: Locale): string[] {
  const blogDirectory = getBlogDirectory(locale);

  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
}

function parseMDXFile(filePath: string, locale: Locale): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const fileName = path.basename(filePath, '.mdx');

    const cleanContent = content
      .trim()
      .replace(/\u00A0/g, ' ')
      .replace(/\u2019/g, "'")
      .replace(/\u201C/g, '"')
      .replace(/\u201D/g, '"');

    return {
      slug: fileName,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      readingTime: data.readingTime || calculateReadingTime(cleanContent),
      tags: data.tags || [],
      author: data.author,
      locale,
      description: data.description,
      content: cleanContent,
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    return null;
  }
}

export function getBlogPostsByLocale(locale: Locale): BlogPost[] {
  const mdxFiles = getMDXFiles(locale);
  const blogDirectory = getBlogDirectory(locale);
  const posts: BlogPost[] = [];

  for (const file of mdxFiles) {
    const filePath = path.join(blogDirectory, file);
    const post = parseMDXFile(filePath, locale);

    if (post) {
      posts.push(post);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const blogDirectory = getBlogDirectory(locale);
  const filePath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseMDXFile(filePath, locale);
}

export function getAllBlogSlugs(): Array<{ slug: string; locale: Locale }> {
  const locales: Locale[] = ['en', 'ua'];
  const slugs: Array<{ slug: string; locale: Locale }> = [];

  for (const locale of locales) {
    const mdxFiles = getMDXFiles(locale);
    for (const file of mdxFiles) {
      const slug = path.basename(file, '.mdx');
      slugs.push({ slug, locale });
    }
  }

  return slugs;
}

export function getAllBlogPosts(): BlogPost[] {
  const locales: Locale[] = ['en', 'ua'];
  const allPosts: BlogPost[] = [];

  for (const locale of locales) {
    const posts = getBlogPostsByLocale(locale);
    allPosts.push(...posts);
  }

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
