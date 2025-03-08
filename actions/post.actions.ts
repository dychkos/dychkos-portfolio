"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma" // Adjust this import based on your project structure

export async function togglePostLike(postId: number, currentLikes: number, isLiked: boolean) {
    try {
        // Calculate new likes count
        const newLikesCount = isLiked ? currentLikes - 1 : currentLikes + 1

        // Update the post in the database
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                likesCount: newLikesCount > 0  ? newLikesCount : 0,
            },
        })

        // Revalidate the posts path to update any cached data
        revalidatePath("/posts")

        // Return the updated post data
        return {
            success: true,
            likesCount: updatedPost.likesCount,
        }
    } catch (error) {
        console.error("Error toggling post like:", error)
        return {
            success: false,
            error: "Failed to update post",
        }
    }
}

