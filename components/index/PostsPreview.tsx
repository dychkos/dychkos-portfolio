import Container from "@/components/Container";
import Heading from "@/components/partials/Heading";
import Post from "@/components/posts/Post";
import Heading2 from "@/components/ui/typography/Heading2";
import React from "react";
import { Link } from "@/lib/navigation";
import { Post as PostType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

const getPosts = async (): Promise<PostType[]> => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
};

const PostsPreview: React.FC = async () => {
  const posts = await getPosts();
  const t = await getTranslations("PostsPreview");

  return (
    <Container className="py-24">
      <Heading>{t("heading")}</Heading>
      <Heading2 className="mt-4 text-center">{t("title")}</Heading2>
      <div className="mx-0 lg:mx-32 mt-8 flex flex-col gap-4">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

      <Link
        className="w-max transition duration-150 ease-out dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 hover:ease-in hover:bg-gray-700 bg-gray-900 font-medium text-white px-4 py-1.5 rounded-xl block mx-auto mt-8"
        href="/posts"
      >
        {t("more")}
      </Link>
    </Container>
  );
};

export default PostsPreview;
