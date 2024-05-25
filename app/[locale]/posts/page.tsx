import Container from "@/components/Container";
import Post from "@/components/posts/Post";
import { Post as PostType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import Heading2 from "@/components/ui/typography/Heading2";

const getPosts = async (): Promise<PostType[]> => {
  return await prisma.post.findMany({});
};

export default async function Page() {
  const posts = await getPosts();

  const t = await getTranslations("Posts");

  return (
    <Container className="lg:px-64 mt-12">
      <div className="mx-auto max-w-lg text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 dark:text-gray-50">
          {t("title")}
        </h2>

        <Heading2 className="mt-4 mx-auto max-w-md text-center">
          {t("text")}
        </Heading2>
      </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}
