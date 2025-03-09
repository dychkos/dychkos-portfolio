import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PostsTable from '@/components/admin/posts/PostsTable';

export default function AdminPage() {
  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Manage Posts
        </h1>
        <Button asChild>
          <Link href='/admin/posts/new'>
            <Plus className='mr-2 h-4 w-4' /> New Post
          </Link>
        </Button>
      </div>

      <div className='overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800'>
        <Suspense
          fallback={<div className='p-4 text-center'>Loading posts...</div>}
        >
          <PostsTable />
        </Suspense>
      </div>
    </div>
  );
}
