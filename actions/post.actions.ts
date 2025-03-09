'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePostCache } from '@/app/admin/events/actions';

export async function togglePostLike(
  postId: number,
  currentLikes: number,
  isLiked: boolean
) {
  try {
    const newLikesCount = isLiked ? currentLikes - 1 : currentLikes + 1;

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: newLikesCount > 0 ? newLikesCount : 0,
      },
    });

    await revalidatePostCache();

    return {
      success: true,
      likesCount: updatedPost.likesCount,
    };
  } catch (error) {
    console.error('Error toggling post like:', error);
    return {
      success: false,
      error: 'Failed to update post',
    };
  }
}
