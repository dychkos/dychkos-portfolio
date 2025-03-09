'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

type PostFormData = z.infer<typeof PostSchema>;

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const validatedFields = PostSchema.safeParse({ title, content });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.post.create({
      data: {
        content,
      },
    });
  } catch (error) {
    return {
      error: {
        _form: 'Failed to create post. Please try again.',
      },
    };
  }

  revalidatePostCache();
  redirect('/admin/posts');
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const validatedFields = PostSchema.safeParse({ title, content });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        content,
      },
    });
  } catch (error) {
    return {
      error: {
        _form: 'Failed to update post. Please try again.',
      },
    };
  }

  revalidatePostCache();
  redirect('/admin/posts');
}

// Delete a post
export async function deletePost(id: number) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete post');
  }

  revalidatePostCache();

  return { success: true };
}

function revalidatePostCache() {
  revalidatePath("/admin/posts'");
  revalidatePath('/ua');
  revalidatePath('/en');
}
