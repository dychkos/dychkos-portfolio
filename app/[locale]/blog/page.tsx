import { isValidLocale, Locale } from '@/lib/i18n';
import { generateBlogListMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReadingLayout from '@/components/site/ReadingLayout';
import ContentsNav from '@/components/site/ContentsNav';
import PostRow from '@/components/site/PostRow';
import { groupPostsByYear } from '@/lib/site/posts';
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
  const t = await getTranslations();

  const allPosts = getBlogPostsByLocale(locale as Locale);

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  if (currentPage > totalPages && totalPages > 0) {
    notFound();
  }

  const years = groupPostsByYear(posts);

  return (
    <ReadingLayout
      aside={
        <ContentsNav
          title={t('Site.contents')}
          items={years.map((y) => ({ id: `y-${y.year}`, label: y.year }))}
        />
      }
    >
      <div className='pb-10 pt-[72px]'>
        <h1 className='break-words text-[34px] font-semibold leading-[1.1] tracking-[-1.3px] sm:text-[44px]'>
          {t('Blog.index.title')}
        </h1>
        <p className='mt-4 text-[18px] text-site-soft'>
          {t('Blog.index.text')}
        </p>
        {totalPosts > 0 && (
          <div className='mt-4 font-site-mono text-[12px] text-site-soft'>
            {totalPosts} {t('Blog.index.postCount')}
          </div>
        )}

        {posts.length > 0 ? (
          <div className='mt-10'>
            {years.map((group) => (
              <div key={group.year} className='mb-8'>
                <div
                  id={`y-${group.year}`}
                  className='mb-2 scroll-mt-[96px] font-site-mono text-[12px] text-site-soft'
                >
                  {group.year}
                </div>
                {group.posts.map((post) => (
                  <PostRow
                    key={`${post.locale}-${post.slug}`}
                    post={post}
                    withYear={false}
                    showDescription
                    readingLabel={t('Blog.readingTime')}
                  />
                ))}
              </div>
            ))}
            {totalPages > 1 && (
              <SimplePaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale as Locale}
              />
            )}
          </div>
        ) : (
          <div className='py-12 text-site-soft'>
            <div className='mb-4 text-4xl'>📝</div>
            <h3 className='mb-2 text-xl font-semibold text-site-ink'>
              {t('Blog.noPostsTitle')}
            </h3>
            <p>{t('Blog.noPostsFound')}</p>
          </div>
        )}
      </div>
    </ReadingLayout>
  );
}
