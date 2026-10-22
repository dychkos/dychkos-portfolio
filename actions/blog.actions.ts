'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const MAX_COMMENT_LENGTH = 2000;

async function getCurrentReaderId(): Promise<number | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const reader = await prisma.reader.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  return reader?.id ?? null;
}

export async function getPostViews(slug: string): Promise<number> {
  const stat = await prisma.blogPostStat.findUnique({ where: { slug } });

  return stat?.views ?? 0;
}

export async function trackPostView(slug: string): Promise<number> {
  const stat = await prisma.blogPostStat.upsert({
    where: { slug },
    create: { slug, views: 1 },
    update: { views: { increment: 1 } },
  });

  return stat.views;
}

export async function getPostComments(slug: string) {
  const readerId = await getCurrentReaderId();

  const rows = await prisma.blogComment.findMany({
    where: { slug },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      body: true,
      createdAt: true,
      authorId: true,
      author: { select: { name: true } },
    },
  });

  // authorId stays on the server. The client only learns whether the comment is its own.
  return rows.map(({ authorId, ...row }) => ({
    ...row,
    isOwn: readerId !== null && authorId === readerId,
  }));
}

export async function addPostComment(slug: string, body: string) {
  const readerId = await getCurrentReaderId();

  if (!readerId) {
    return { success: false, error: 'unauthorized' as const };
  }

  const text = body.trim();

  if (text.length === 0 || text.length > MAX_COMMENT_LENGTH) {
    return { success: false, error: 'invalid' as const };
  }

  await prisma.blogComment.create({
    data: { slug, body: text, authorId: readerId },
  });

  return { success: true as const };
}

export async function deleteOwnComment(commentId: number) {
  const readerId = await getCurrentReaderId();

  if (!readerId) {
    return { success: false, error: 'unauthorized' as const };
  }

  // Filtering by authorId means a reader can never delete someone else's comment.
  const result = await prisma.blogComment.deleteMany({
    where: { id: commentId, authorId: readerId },
  });

  if (result.count === 0) {
    return { success: false, error: 'not_found' as const };
  }

  return { success: true as const };
}
