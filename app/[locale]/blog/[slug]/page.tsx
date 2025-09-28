import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import { isValidLocale } from '@/lib/i18n';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/lib/i18n';
import Container from '@/components/Container';
import { MDXContent } from '@/components/MDXContent';

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

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ua' ? 'uk-UA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <Container className='mt-12'>
      <article className='space-y-20'>
        {/* Back to blog */}
        <Link
          href={`/${locale}/blog`}
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('blogPage.backToBlog')}
        </Link>

        <header className='mb-12'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl'>
              {post.title}
            </h1>

            {/* Article Meta */}
            <div className='mb-6 flex flex-wrap items-center justify-center gap-6 text-muted-foreground'>
              <div className='flex items-center space-x-2'>
                <Calendar className='h-4 w-4' />
                <span>
                  {t('blogPage.publishedOn')} {formattedDate}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Clock className='h-4 w-4' />
                <span>
                  {post.readingTime} {t('readingTime')}
                </span>
              </div>
            </div>

            {/* Author */}
            {post.author && (
              <div className='mb-6 text-muted-foreground'>
                <span>
                  {t('blogPage.author')} {post.author}
                </span>
              </div>
            )}

            {/* Tags */}
            <div className='mb-8 flex flex-wrap justify-center gap-2'>
              {post.tags && post.tags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Article content */}
        <div className='prose prose-lg dark:prose-invert max-w-none'>
          <MDXContent source={post.content} />
        </div>

        {/* Back to blog footer */}
        <footer>
          <Link
            href={`/${locale}/blog`}
            className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <ArrowLeft className='h-4 w-4' />
            {t('blogPage.backToBlog')}
          </Link>
        </footer>
      </article>
    </Container>
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
