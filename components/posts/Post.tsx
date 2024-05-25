"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import Body1 from "@/components/ui/typography/Body1";
import { Link } from "@/lib/navigation";
import LikeButton from "@/components/ui/LikeButton";
import { Post as PostType } from "@prisma/client";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";

interface PostProps {
  post: PostType;
}

const likePost = async (post: PostType) => {
  try {
    await fetch("/api/posts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  } catch (e) {
    console.log(e);
  }
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);

  useEffect(() => {
    setLiked(hasCookie(`post.${post.id}.liked`));
  }, [post.id]);

  const handleLike = useCallback(async () => {
    setLoading(true);
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;

    try {
      await likePost({
        ...post,
        likesCount: newLikesCount,
      });

      setLikesCount(newLikesCount);
      setLiked((prevLiked) => !prevLiked);

      if (liked) {
        deleteCookie(`post.${post.id}.liked`);
      } else {
        const oneDay = 24 * 60 * 60 * 1000;
        setCookie(`post.${post.id}.liked`, "1", { maxAge: oneDay });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [liked, likesCount, post]);

  return (
    <article className="rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 transition shadow hover:shadow-md">
      <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
        <Link href="/" className="block shrink-0">
          <Image
            src="/images/img_me.jpg"
            alt="Me"
            width={480}
            height={480}
            className="size-14 rounded object-cover"
          />
        </Link>
        <div>
          <Body1>{post.content}</Body1>
          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center">
              <LikeButton
                likesCount={likesCount}
                isLiked={liked}
                onLike={handleLike}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
