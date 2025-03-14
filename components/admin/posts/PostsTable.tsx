import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import DeletePostButton from '@/components/admin/posts/PostDeleteButton';

export default async function PostsTable() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (posts.length === 0) {
    return (
      <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
        No posts found. Create your first post to get started.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Content
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Likes
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Created
            </th>
            <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
          {posts.map((post) => (
            <tr
              key={post.id}
              className='dark:hover:bg-gray-750 hover:bg-gray-50'
            >
              <td className='whitespace-nowrap px-6 py-4'>
                <div className='max-w-md truncate text-sm text-gray-500 dark:text-gray-400'>
                  {post.content?.substring(0, 100) || 'No content'}
                </div>
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {post.likesCount || 0}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {post.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })
                  : 'Unknown'}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                <div className='flex justify-end space-x-2'>
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Pencil className='h-4 w-4' />
                    </Link>
                  </Button>
                  <DeletePostButton id={post.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
