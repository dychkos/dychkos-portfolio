import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getPostBySlug,
  getAllBlogSlugs,
  getBlogPostsByLocale,
} from '@/lib/blog';
import { isValidLocale } from '@/lib/i18n';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/lib/i18n';
import { MDXContent } from '@/components/MDXContent';
import ReadingLayout from '@/components/site/ReadingLayout';
import ContentsNav from '@/components/site/ContentsNav';
import PostExtras from '@/components/blog/PostExtras';
import { extractHeadings } from '@/lib/site/toc';
import { formatPostDate, getAdjacentPosts } from '@/lib/site/posts';
import { cn } from '@/utils/helper';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations('Blog');
  const tSite = await getTranslations('Site');

  const all = getBlogPostsByLocale(locale as Locale);
  const { newer, older } = getAdjacentPosts(all, slug);
  const headings = extractHeadings(post.content);

  const card = (
    target: typeof newer,
    arrow: string,
    align: 'left' | 'right'
  ) =>
    target ? (
      <Link
        href={`/${locale}/blog/${target.slug}`}
        className={cn(
          'block rounded-xl border border-site-line bg-site-surface px-4 py-3.5 transition-colors hover:border-site-accent',
          align === 'right' && 'text-right'
        )}
      >
        <div className='text-site-soft'>{arrow}</div>
        <div className='mt-1 text-[15px] font-medium text-site-ink'>
          {target.title}
        </div>
      </Link>
    ) : (
      <div />
    );

  return (
    <ReadingLayout
      aside={
        <ContentsNav
          title={tSite('contents')}
          items={headings.map((h) => ({
            id: h.id,
            label: h.text,
            level: h.level,
          }))}
          rootMargin='-20% 0px -70% 0px'
        />
      }
    >
      <main className='pb-10 pt-[72px]'>
        <header className='mb-9 border-b border-site-line pb-[22px]'>
          <Link
            href={`/${locale}/blog`}
            className='group mb-6 inline-flex items-center gap-1.5 text-[14px] text-site-soft transition-colors hover:text-site-ink'
          >
            <span className='transition-transform group-hover:-translate-x-0.5'>
              ←
            </span>
            {t('blogPage.backToBlog')}
          </Link>

          <h1 className='text-[44px] font-semibold leading-[1.1] tracking-[-1.3px] text-site-ink'>
            {post.title}
          </h1>

          {post.description && (
            <p className='mt-4 text-[18px] leading-relaxed text-site-soft'>
              {post.description}
            </p>
          )}

          <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-site-mono text-[12px] text-site-soft'>
            <span>
              {t('blogPage.publishedOn')}{' '}
              {formatPostDate(post.date, locale as 'en' | 'ua', true)} ·{' '}
              {post.readingTime} {t('readingTime')}
            </span>
            {post.tags && post.tags.length > 0 && (
              <span className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-md bg-site-accent-soft px-2 text-site-accent'
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        <article>
          <MDXContent source={post.content} />
        </article>

        <PostExtras slug={slug} locale={locale} />

        <nav className='mt-7 grid grid-cols-2 gap-4'>
          {card(older, '←', 'left')}
          {card(newer, '→', 'right')}
        </nav>
      </main>
    </ReadingLayout>
  );
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();

  return slugs.map(({ slug, locale }) => ({
    slug,
    locale,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}
