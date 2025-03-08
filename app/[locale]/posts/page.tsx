import Container from "@/components/Container"
import Post from "@/components/posts/Post"
import type { Post as PostType } from "@prisma/client"
import prisma from "@/lib/prisma"
import {getTranslations, unstable_setRequestLocale} from "next-intl/server"
import Heading2 from "@/components/ui/typography/Heading2"
import { Suspense } from "react"

const getPosts = async (): Promise<PostType[]> => {
  try {
    return await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

interface IndexProps {
  params: {
    locale: string;
  };
}


export default async function Local({ params: { locale } }: IndexProps) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("Posts")

  return (
    <Container className="lg:px-64 mt-12">
      <div className="mx-auto max-w-lg text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 dark:text-gray-50">{t("title")}</h2>

        <Heading2 className="mt-4 mx-auto max-w-md text-center">{t("text")}</Heading2>
      </div>

      <Suspense fallback={<div className="text-center">Loading posts...</div>}>
        <PostsList />
      </Suspense>
    </Container>
  )
}

async function PostsList() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return <div className="text-center">No posts found.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

