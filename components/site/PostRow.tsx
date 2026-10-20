import React from 'react';
import Link from 'next/link';
import type { BlogPostMetadata } from '@/lib/blog';
import { formatPostDate } from '@/lib/site/posts';

interface PostRowProps {
  post: BlogPostMetadata;
  withYear: boolean;
  showDescription: boolean;
  readingLabel: string;
}

const PostRow: React.FC<PostRowProps> = ({
  post,
  withYear,
  showDescription,
  readingLabel,
}) => {
  const locale = post.locale as 'en' | 'ua';
  return (
    <Link
      href={`/${post.locale}/blog/${post.slug}`}
      className='group block border-t border-site-line py-5'
    >
      <div className='grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1'>
        <h3 className='text-[19px] font-medium transition-colors group-hover:text-site-accent'>
          {post.title}
        </h3>
        <div className='font-site-mono text-[12px] text-site-soft'>
          {formatPostDate(post.date, locale, withYear)} · {post.readingTime}{' '}
          {readingLabel}
        </div>
        {showDescription && post.description && (
          <p className='col-span-2 text-[15px] text-site-soft'>
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className='col-span-2 mt-1 flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-md bg-site-accent-soft px-2 text-xs text-site-accent'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PostRow;
