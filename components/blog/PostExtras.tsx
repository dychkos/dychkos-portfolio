'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import {
  addPostComment,
  getPostComments,
  getPostViews,
  trackPostView,
} from '@/actions/blog.actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PostExtrasProps {
  slug: string;
  locale: string;
}

interface Comment {
  id: number;
  body: string;
  createdAt: Date;
  author: { name: string | null };
}

const VIEWED_KEY_PREFIX = 'blog-viewed:';

const PostExtras: React.FC<PostExtrasProps> = (props) => (
  <SessionProvider>
    <PostExtrasContent {...props} />
  </SessionProvider>
);

const PostExtrasContent: React.FC<PostExtrasProps> = ({ slug, locale }) => {
  const t = useTranslations('Blog');
  const { data: session, status } = useSession();
  const [views, setViews] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = () =>
    getPostComments(slug).then((rows) => setComments(rows));

  useEffect(() => {
    // Count one view per browser tab session. Storage can throw in private mode.
    let alreadyViewed = false;
    try {
      alreadyViewed = sessionStorage.getItem(VIEWED_KEY_PREFIX + slug) !== null;
    } catch {}

    const load = alreadyViewed
      ? getPostViews(slug)
      : trackPostView(slug).then((count) => {
          try {
            sessionStorage.setItem(VIEWED_KEY_PREFIX + slug, '1');
          } catch {}
          return count;
        });

    load.then(setViews);
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await addPostComment(slug, body);

    setSubmitting(false);

    if (!result.success) {
      setError(t('comments.error'));
      return;
    }

    setBody('');
    loadComments();
  }

  const dateFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className='mt-12 border-t border-site-line pt-8'>
      <div className='flex items-baseline justify-between gap-4'>
        <h2 className='text-[22px] font-semibold text-site-ink'>
          {t('comments.title')} ({comments.length})
        </h2>
        {views !== null && (
          <span className='font-site-mono text-[12px] text-site-soft'>
            {t('views', { count: views })}
          </span>
        )}
      </div>

      <div className='mt-6'>
        {status === 'authenticated' ? (
          <form onSubmit={handleSubmit} className='space-y-3'>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={t('comments.placeholder')}
              maxLength={2000}
              disabled={submitting}
              rows={4}
            />
            {error && <p className='text-[14px] text-red-600'>{error}</p>}
            <div className='flex items-center justify-between gap-4'>
              <span className='text-[13px] text-site-soft'>
                {t('comments.signedInAs', {
                  name: session?.user?.name ?? session?.user?.email ?? '',
                })}
              </span>
              <Button
                type='submit'
                disabled={submitting || body.trim().length === 0}
              >
                {submitting ? t('comments.submitting') : t('comments.submit')}
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-site-line bg-site-surface px-4 py-3.5'>
            <span className='text-[15px] text-site-soft'>
              {t('comments.signInPrompt')}
            </span>
            <Button
              type='button'
              variant='outline'
              disabled={status === 'loading'}
              onClick={() =>
                signIn('google', { callbackUrl: window.location.pathname })
              }
            >
              {t('comments.signInWithGoogle')}
            </Button>
          </div>
        )}
      </div>

      <ul className='mt-8 space-y-6'>
        {comments.length === 0 && (
          <li className='text-[15px] text-site-soft'>{t('comments.empty')}</li>
        )}
        {comments.map((comment) => (
          <li key={comment.id} className='space-y-1.5'>
            <div className='flex flex-wrap items-baseline gap-x-3 font-site-mono text-[12px] text-site-soft'>
              <span className='font-medium text-site-ink'>
                {comment.author.name ?? t('comments.anonymous')}
              </span>
              <span>{dateFormat.format(new Date(comment.createdAt))}</span>
            </div>
            <p className='whitespace-pre-line break-words text-[15px] leading-relaxed text-site-ink'>
              {comment.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostExtras;
