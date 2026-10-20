import Preview from '@/components/index/Preview';
import About from '@/components/index/About';
import Skills from '@/components/index/Skills';
import Experience from '@/components/index/Experience';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { Metadata } from 'next';
import PostsPreview from '@/components/index/PostsPreview';
import GetInTouch from '@/components/index/GetInTouch';
import ReadingLayout from '@/components/site/ReadingLayout';
import ContentsNav, { type ContentsItem } from '@/components/site/ContentsNav';

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

  const t = await getTranslations();

  const items: ContentsItem[] = [
    { id: 'hero', num: '00', label: t('Site.hi') },
    { id: 'about', num: '01', label: t('About.heading') },
    { id: 'skills', num: '02', label: t('Skills.heading') },
    { id: 'experience', num: '03', label: t('Experience.heading') },
    { id: 'notes', num: '04', label: t('PostsPreview.heading') },
    { id: 'contact', num: '05', label: t('GetInTouch.heading') },
  ];

  return (
    <ReadingLayout
      aside={<ContentsNav title={t('Site.contents')} items={items} />}
    >
      <Preview />
      <About />
      <Skills />
      <Experience />
      <div id='notes'>
        <PostsPreview />
      </div>
      <div id='contact'>
        <GetInTouch />
      </div>
    </ReadingLayout>
  );
}
