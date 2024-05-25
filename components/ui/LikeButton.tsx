import React from "react";
import { cn } from "@/utils/helper";

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
          "cursor-pointer flex h-min w-min space-x-1 items-center rounded-full text-gray-400 hover:text-rose-600 bg-gray-300 dark:bg-gray-700 hover:bg-rose-50 py-1 px-2 text-xs font-medium",
          {
            "cursor-default text-rose-600 bg-rose-50 dark:bg-rose-50": isLiked,
            "pointer-events-none": loading,
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current hover:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <p className="font-semibold text-xs">{likesCount}</p>
      </span>
    </button>
  );
};

export default LikeButton;
