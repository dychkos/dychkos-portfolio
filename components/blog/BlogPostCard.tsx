import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(
    post.locale === 'ua' ? 'uk-UA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const t = useTranslations('Blog');

  return (
    <article className='group'>
      <Link href={`/${post.locale}/blog/${post.slug}`}>
        <div className='space-y-3 rounded-lg border border-border p-6 transition-colors hover:border-muted-foreground/20'>
          <div className='space-y-2'>
            <h2 className='text-balance text-xl font-semibold tracking-tight transition-colors group-hover:text-primary'>
              {post.title}
            </h2>
            <p className='text-pretty leading-relaxed text-muted-foreground'>
              {post.description}
            </p>
          </div>

          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='h-3 w-3' />
              <span>
                {post.readingTime} {t('readingTime')}
              </span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
