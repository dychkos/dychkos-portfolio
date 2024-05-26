import Preview from "@/components/index/Preview";
import About from "@/components/index/About";
import Skills from "@/components/index/Skills";
import Experience from "@/components/index/Experience";
import { unstable_setRequestLocale } from "next-intl/server";
// import PostsPreview from "@/components/index/PostsPreview";
import React from "react";
import PostsPreview from "@/components/index/PostsPreview";

interface IndexProps {
  params: {
    locale: string;
  };
}

export default function Index({ params: { locale } }: IndexProps) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Preview />
      <About />
      <Skills />
      <Experience />
      <PostsPreview />
      {/*<Work />*/}
    </main>
  );
}
