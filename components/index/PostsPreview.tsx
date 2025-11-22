import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import Container from '@/components/Container';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { getBlogPostsByLocale } from '@/lib/blog';
import { Locale } from '@/lib/i18n';
import Heading from '@/components/partials/Heading';
import Heading2 from '@/components/ui/typography/Heading2';

const PostsPreview: React.FC = async () => {
  const t = await getTranslations('PostsPreview');
  const locale = (await getLocale()) as Locale;

  const allPosts = getBlogPostsByLocale(locale);
  const posts = allPosts.slice(0, 3);

  return (
    <Container className='py-24'>
      <Heading>{t('heading')}</Heading>
      <Heading2 className='mt-4 text-center'>{t('title')}</Heading2>

      {posts.length > 0 ? (
        <>
          <div className='mx-auto mt-8 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <BlogPostCard key={`${post.locale}-${post.slug}`} post={post} />
            ))}
          </div>

          <Link
            className='mx-auto mt-8 block w-max rounded-xl bg-gray-900 px-4 py-1.5 font-medium text-white transition duration-150 ease-out hover:bg-gray-700 hover:ease-in dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200'
            href={`/${locale}/blog`}
          >
            {t('more')}
          </Link>
        </>
      ) : (
        <div className='mt-8 text-center text-muted-foreground'>
          <p>{t('noPosts')}</p>
        </div>
      )}
    </Container>
  );
};

export default PostsPreview;
