import { isValidLocale, Locale } from '@/lib/i18n';
import { generateBlogListMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import Container from '@/components/Container';
import { getBlogPostsByLocale } from '@/lib/blog';
import { SimplePaginationControls } from '@/components/blog/SimplePaginationControl';
import { getTranslations } from 'next-intl/server';

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return generateBlogListMetadata(locale);
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const { page } = await searchParams;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const t = await getTranslations('Blog');

  const allPosts = getBlogPostsByLocale(locale as Locale);

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  return (
    <Container className='mt-12'>
      <div className='space-y-12'>
        {/* Header */}
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <h1 className='mt-6 text-3xl font-bold text-gray-900 dark:text-gray-50 sm:text-4xl'>
            {t('index.title')}
          </h1>
          <p className='mx-auto mt-4 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300'>
            {t('index.text')}
          </p>

          {/* Posts count */}
          {totalPosts > 0 && (
            <div className='mt-4 text-sm text-muted-foreground'>
              {totalPosts} {t('index.postCount')}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {posts.map((post) => (
                <BlogPostCard key={`${post.locale}-${post.slug}`} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <SimplePaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale as Locale}
              />
            )}
          </>
        ) : (
          <div className='py-12 text-center'>
            <div className='mx-auto max-w-md'>
              <div className='mb-4 text-4xl'>📝</div>
              <h3 className='mb-2 text-xl font-semibold text-foreground'>
                {t('noPostsTitle')}
              </h3>
              <p className='text-muted-foreground'>{t('noPostsFound')}</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
