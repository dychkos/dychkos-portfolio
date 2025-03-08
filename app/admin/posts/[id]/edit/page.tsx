import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { PostForm } from "../../post-form"

interface EditPostPageProps {
    params: {
        id: string
    }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
        notFound()
    }

    const post = await prisma.post.findUnique({
        where: { id },
    })

    if (!post) {
        notFound()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Post</h1>
            <PostForm post={post} />
        </div>
    )
}

