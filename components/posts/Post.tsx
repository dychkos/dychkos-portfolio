'use client';
import Image from 'next/image';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Body1 from '@/components/ui/typography/Body1';
import { Link } from '@/lib/navigation';
import LikeButton from '@/components/ui/LikeButton';
import type { Post as PostType } from '@prisma/client';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import Body2 from '@/components/ui/typography/Body2';
import { togglePostLike } from '@/actions/post.actions';
import { useOptimistic } from 'react';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const [optimisticLikesCount, setOptimisticLikesCount] = useOptimistic(
    post.likesCount,
    (state, newCount: number) => newCount
  );

  useEffect(() => {
    setLiked(hasCookie(`post.${post.id}.liked`));
  }, [post.id]);

  const handleLike = useCallback(async () => {
    setLoading(true);

    // Optimistically update the UI
    const newLikesCount = liked
      ? optimisticLikesCount - 1
      : optimisticLikesCount + 1;
    setOptimisticLikesCount(newLikesCount);

    try {
      // Call the server action to update the post
      const result = await togglePostLike(post.id, post.likesCount, liked);

      if (result.success) {
        // Update liked state
        setLiked((prevLiked) => !prevLiked);

        // Update cookie
        if (liked) {
          deleteCookie(`post.${post.id}.liked`);
        } else {
          const oneDay = 24 * 60 * 60 * 1000;
          setCookie(`post.${post.id}.liked`, '1', { maxAge: oneDay });
        }
      } else {
        // If the server action failed, revert the optimistic update
        setOptimisticLikesCount(post.likesCount);
        console.error(result.error);
      }
    } catch (e) {
      // If there was an error, revert the optimistic update
      setOptimisticLikesCount(post.likesCount);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [liked, optimisticLikesCount, post.id, post.likesCount]);

  return (
    <article className='rounded-xl border-2 border-gray-100 bg-gray-50 shadow transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800'>
      <div className='flex items-start gap-4 p-4 sm:p-6 lg:p-8'>
        <Link href='/' className='block shrink-0'>
          <Image
            src='/images/img_me.jpg'
            alt='Me'
            width={480}
            height={480}
            className='size-14 rounded object-cover'
          />
        </Link>
        <div className='flex-grow'>
          <Body1>{post.content}</Body1>
          <div className='mt-2 sm:flex sm:items-center sm:gap-2'>
            <div className='flex items-center'>
              <LikeButton
                likesCount={optimisticLikesCount}
                isLiked={liked}
                onLike={handleLike}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <Body2>
          {post.createdAt.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </Body2>
      </div>
    </article>
  );
};

export default Post;
