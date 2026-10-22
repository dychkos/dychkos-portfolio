'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const MAX_COMMENT_LENGTH = 2000;

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
  return prisma.blogComment.findMany({
    where: { slug },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      body: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });
}

export async function addPostComment(slug: string, body: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { success: false, error: 'unauthorized' as const };
  }

  const text = body.trim();

  if (text.length === 0 || text.length > MAX_COMMENT_LENGTH) {
    return { success: false, error: 'invalid' as const };
  }

  const reader = await prisma.reader.findUnique({
    where: { email: session.user.email },
  });

  if (!reader) {
    return { success: false, error: 'unauthorized' as const };
  }

  await prisma.blogComment.create({
    data: { slug, body: text, authorId: reader.id },
  });

  return { success: true as const };
}
