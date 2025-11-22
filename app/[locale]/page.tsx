import Preview from '@/components/index/Preview';
import About from '@/components/index/About';
import Skills from '@/components/index/Skills';
import Experience from '@/components/index/Experience';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { Metadata } from 'next';
import PostsPreview from '@/components/index/PostsPreview';

interface IndexProps {
  params: {
    locale: string;
  };
}

// metadata.js
export const metadata: Metadata = {
  title: 'Serhii Dychko | Developer',
  description:
    "Welcome to my developer portfolio. Here, you'll find my projects, skills, and contact information.",
  keywords: 'developer, portfolio, web development, projects, skills',
  authors: [
    {
      url: 'https://dychkos.top',
      name: 'Serhii Dychko',
    },
  ],
  openGraph: {
    title: "Serhii Dychko's Portfolio",
    description: 'Showcasing my projects and skills.',
    images: '/images/img_me.jpg',
    url: 'https://dychkos.top',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Serhii Dychko's Portfolio",
    description: 'Showcasing my projects and skills.',
    images: '/images/img_me.jpg',
  },
};

export default async function Index({ params: { locale } }: IndexProps) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Index');
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
