import { getTranslations } from 'next-intl/server';
import prisma from '@/lib/prisma';
import type { Post as PostType } from '@prisma/client';
import Post from '@/components/posts/Post';
import { Link } from '@/lib/navigation';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PostPreviewProps {
  limit?: number;
  showHeading?: boolean;
}

async function getPosts(limit = 3): Promise<PostType[]> {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });
}

export default async function PostPreview({
  limit = 3,
  showHeading = true,
}: PostPreviewProps) {
  const posts = await getPosts(limit);
  const t = await getTranslations('PostsPreview');

  return (
    <Card className='border-none shadow-none'>
      {showHeading && (
        <CardHeader>
          <CardTitle className='flex items-center justify-center gap-2 text-center text-2xl font-bold'>
            <FileText className='h-5 w-5' />
            {t('title')}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className='px-0 sm:px-6'>
        <div className='space-y-4'>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <Button asChild variant='outline'>
            <Link href='/posts'>{t('more')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
