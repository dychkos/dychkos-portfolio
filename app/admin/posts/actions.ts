"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

// Schema for post validation
const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

type PostFormData = z.infer<typeof PostSchema>

// Create a new post
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  // Validate the data
  const validatedFields = PostSchema.safeParse({ title, content })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
      },
    })

    revalidatePath("/admin/posts")
    redirect("/admin/posts")
  } catch (error) {
    return {
      error: {
        _form: "Failed to create post. Please try again.",
      },
    }
  }
}

// Update an existing post
export async function updatePost(id: number, formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  // Validate the data
  const validatedFields = PostSchema.safeParse({ title, content })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    })

    revalidatePath("/admin/posts")
    redirect("/admin/posts")
  } catch (error) {
    return {
      error: {
        _form: "Failed to update post. Please try again.",
      },
    }
  }
}

// Delete a post
export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: { id },
    })

    revalidatePath("/admin/posts")
    return { success: true }
  } catch (error) {
    throw new Error("Failed to delete post")
  }
}

