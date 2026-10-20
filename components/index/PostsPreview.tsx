import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { getBlogPostsByLocale } from '@/lib/blog';
import { Locale } from '@/lib/i18n';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import PostRow from '@/components/site/PostRow';

const PostsPreview: React.FC = async () => {
  const t = await getTranslations('PostsPreview');
  const tBlog = await getTranslations('Blog');
  const locale = (await getLocale()) as Locale;

  const posts = getBlogPostsByLocale(locale).slice(0, 3);

  return (
    <Reveal as='section' id='notes' className='pt-24'>
      <SectionHeading num='04' title={t('heading')} lead={t('title')} />
      {posts.length > 0 ? (
        <>
          <div className='mt-4 border-b border-site-line'>
            {posts.map((post) => (
              <PostRow
                key={`${post.locale}-${post.slug}`}
                post={post}
                withYear
                showDescription={false}
                readingLabel={tBlog('readingTime')}
              />
            ))}
          </div>
          <Link
            href={`/${locale}/blog`}
            className='group mt-6 inline-block text-[15px] text-site-accent'
          >
            {t('more')}{' '}
            <span className='inline-block transition-transform group-hover:translate-x-[3px]'>
              →
            </span>
          </Link>
        </>
      ) : (
        <p className='mt-6 text-site-soft'>{tBlog('noPostsTitle')}</p>
      )}
    </Reveal>
  );
};

export default PostsPreview;
