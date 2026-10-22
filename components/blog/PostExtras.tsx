'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import {
  addPostComment,
  deleteOwnComment,
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
  isOwn: boolean;
  author: { name: string | null };
}

const VIEWED_KEY_PREFIX = 'blog-viewed:';

const PostExtras: React.FC<PostExtrasProps> = (props) => (
  <SessionProvider>
    <PostExtrasContent {...props} />
  </SessionProvider>
);

const CommentSkeleton = () => (
  <ul
    className='mt-8 animate-pulse divide-y divide-site-line motion-reduce:animate-none'
    aria-hidden='true'
  >
    {[0, 1, 2].map((i) => (
      <li key={i} className='flex gap-3 py-5'>
        <div className='size-9 shrink-0 rounded-[11px] bg-site-line' />
        <div className='flex-1 space-y-2.5 pt-1'>
          <div className='h-3 w-32 rounded bg-site-line' />
          <div className='h-3 w-full rounded bg-site-line' />
          <div className='h-3 w-2/3 rounded bg-site-line' />
        </div>
      </li>
    ))}
  </ul>
);

const PostExtrasContent: React.FC<PostExtrasProps> = ({ slug, locale }) => {
  const t = useTranslations('Blog');
  const { data: session, status } = useSession();
  const [views, setViews] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
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

  async function handleDelete(commentId: number) {
    setDeletingId(commentId);
    setError(null);

    const result = await deleteOwnComment(commentId);

    setDeletingId(null);
    setPendingDeleteId(null);

    if (!result.success) {
      setError(t('comments.deleteError'));
      return;
    }

    loadComments();
  }

  const dateFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className='mt-14 border-t border-site-line pt-8'>
      <div className='flex items-baseline justify-between gap-4'>
        <h2 className='text-[22px] font-semibold tracking-[-0.5px] text-site-ink'>
          {t('comments.title')}
          {comments !== null && (
            <span className='ml-2 font-site-mono text-[14px] font-normal text-site-soft'>
              {comments.length}
            </span>
          )}
        </h2>
        {views !== null && (
          <span className='font-site-mono text-[12px] text-site-soft'>
            {t('views', { count: views })}
          </span>
        )}
      </div>

      <div className='mt-6'>
        {status === 'authenticated' ? (
          <form
            onSubmit={handleSubmit}
            className='rounded-xl border border-site-line bg-site-surface p-4 transition-colors focus-within:border-site-accent'
          >
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={t('comments.placeholder')}
              maxLength={2000}
              disabled={submitting}
              rows={3}
              className='min-h-[88px] resize-none border-0 bg-transparent p-0 text-[15px] text-site-ink shadow-none placeholder:text-site-soft focus-visible:ring-0'
            />
            {error && <p className='mt-3 text-[14px] text-red-600'>{error}</p>}
            <div className='mt-4 flex items-center justify-between gap-4 border-t border-site-line pt-3'>
              <span className='truncate text-[13px] text-site-soft'>
                {t('comments.signedInAs', {
                  name: session?.user?.name ?? session?.user?.email ?? '',
                })}
              </span>
              <Button
                type='submit'
                disabled={submitting || body.trim().length === 0}
                className='hover:opacity-90 h-9 rounded-lg bg-site-accent px-4 text-white'
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
              className='h-9 rounded-lg border-site-line bg-transparent text-site-ink hover:border-site-accent hover:bg-transparent hover:text-site-accent'
              onClick={() =>
                signIn('google', { callbackUrl: window.location.pathname })
              }
            >
              {t('comments.signInWithGoogle')}
            </Button>
          </div>
        )}
      </div>

      {comments === null ? (
        <CommentSkeleton />
      ) : (
        <ul className='mt-8 divide-y divide-site-line'>
          {comments.length === 0 && (
            <li className='py-5 text-[15px] text-site-soft'>
              {t('comments.empty')}
            </li>
          )}
          {comments.map((comment) => {
            const name = comment.author.name ?? t('comments.anonymous');

            return (
              <li key={comment.id} className='flex gap-3 py-5'>
                <div
                  aria-hidden='true'
                  className='flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-site-accent-soft text-[14px] font-semibold text-site-accent'
                >
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-baseline gap-x-2.5 gap-y-1'>
                    <span className='text-[14px] font-medium text-site-ink'>
                      {name}
                    </span>
                    <time
                      dateTime={new Date(comment.createdAt).toISOString()}
                      className='font-site-mono text-[12px] text-site-soft'
                    >
                      {dateFormat.format(new Date(comment.createdAt))}
                    </time>
                    {comment.isOwn && (
                      <span className='ml-auto flex items-center gap-3 text-[13px]'>
                        {pendingDeleteId === comment.id ? (
                          <>
                            <button
                              type='button'
                              onClick={() => handleDelete(comment.id)}
                              disabled={deletingId === comment.id}
                              className='text-red-600 hover:underline disabled:opacity-50'
                            >
                              {t('comments.confirmDelete')}
                            </button>
                            <button
                              type='button'
                              onClick={() => setPendingDeleteId(null)}
                              className='text-site-soft transition-colors hover:text-site-ink'
                            >
                              {t('comments.cancel')}
                            </button>
                          </>
                        ) : (
                          <button
                            type='button'
                            onClick={() => setPendingDeleteId(comment.id)}
                            className='text-site-soft transition-colors hover:text-site-ink'
                          >
                            {t('comments.delete')}
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                  <p className='mt-1.5 whitespace-pre-line break-words text-[15px] leading-[1.7] text-site-ink'>
                    {comment.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PostExtras;
