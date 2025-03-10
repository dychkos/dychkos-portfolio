import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PostForm } from '@/components/admin/posts/PostForm';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const id = Number.parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
        Edit Post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
