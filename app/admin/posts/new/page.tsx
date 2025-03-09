import { PostForm } from '@/components/admin/posts/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
        Create New Post
      </h1>
      <PostForm />
    </div>
  );
}
