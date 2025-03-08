import { PostForm } from "../post-form"

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Post</h1>
      <PostForm />
    </div>
  )
}

