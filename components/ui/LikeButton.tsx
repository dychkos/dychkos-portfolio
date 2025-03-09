import React from 'react';
import { cn } from '@/utils/helper';

interface LikeButtonProps {
  likesCount: number;
  isLiked: boolean;
  loading: boolean;
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  likesCount,
  loading,
  onLike,
}) => {
  return (
    <button onClick={onLike} disabled={loading}>
      <span
        className={cn(
          'flex h-min w-min cursor-pointer items-center space-x-1 rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:bg-gray-700',
          {
            'cursor-default bg-rose-50 text-rose-600 dark:bg-rose-50': isLiked,
            'pointer-events-none': loading,
          }
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 fill-current hover:text-red-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
        <p className='text-xs font-semibold'>{likesCount}</p>
      </span>
    </button>
  );
};

export default LikeButton;
