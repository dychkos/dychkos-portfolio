import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { BlogPost } from '@/lib/blog';

interface GenerateMetadataProps {
  locale: Locale;
  title?: string;
  description?: string;
  path?: string;
  post?: BlogPost;
}

export function generateMetadata({
  locale,
  title,
  description,
  path = '',
  post,
}: GenerateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const siteName = 'Serhii Dychko - Developer Blog';

  const defaultTitle =
    locale === 'ua'
      ? "Ваше Ім'я - Блог розробника"
      : 'Serhii Dychko - Developer Blog';
  const defaultDescription =
    locale === 'ua'
      ? 'Блог про веб-розробку, дизайн та сучасні технології. Діляюся досвідом та знаннями.'
      : 'Blog about web development, design, and modern technologies. Sharing experience and knowledge.';

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const fullUrl = `${baseUrl}/${locale}${path}`;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords:
      locale === 'ua'
        ? [
            'веб-розробка',
            'React',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'фронтенд',
            'блог',
          ]
        : [
            'web development',
            'React',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'frontend',
            'blog',
          ],
    authors: [{ name: 'Serhii Dychko' }],
    creator: 'Serhii Dychko',
    publisher: 'Serhii Dychko',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${baseUrl}/en${path}`,
        uk: `${baseUrl}/ua${path}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: fullUrl,
      siteName,
      locale: locale === 'ua' ? 'uk_UA' : 'en_US',
      type: post ? 'article' : 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(post && {
        publishedTime: post.date,
        authors: ['Serhii Dychko'],
        tags: post.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      creator: '@yourusername',
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

export function generateBlogPostMetadata(
  post: BlogPost,
  locale: Locale
): Metadata {
  return generateMetadata({
    locale,
    title: `${post.title} | ${locale === 'ua' ? 'Блог' : 'Blog'}`,
    description: post.description,
    path: `/blog/${post.slug}`,
    post,
  });
}

export function generateBlogListMetadata(locale: Locale): Metadata {
  const title = `${locale === 'ua' ? "Ваше Ім'я" : 'Serhii Dychko'}`;
  const description =
    locale === 'ua'
      ? 'Всі статті про веб-розробку, дизайн та сучасні технології.'
      : 'All articles about web development, design, and modern technologies.';

  return generateMetadata({
    locale,
    title,
    description,
    path: '/blog',
  });
}
