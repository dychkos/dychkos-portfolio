import clsx from 'clsx';
import { JetBrains_Mono, Onest } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { ReactNode } from 'react';
import { locales } from '@/config';
import Providers from '@/app/Providers';
import { ChapterProvider } from '@/components/site/ChapterProvider';
import ReadingProgress from '@/components/site/ReadingProgress';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-onest',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html
      className='h-full scroll-smooth motion-reduce:scroll-auto'
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={clsx(
          onest.variable,
          jetbrainsMono.variable,
          'flex min-h-full flex-col bg-site-bg font-site text-site-ink antialiased'
        )}
      >
        <Providers>
          <ChapterProvider>
            <ReadingProgress />
            <SiteHeader />
            {children}
            <SiteFooter />
          </ChapterProvider>
        </Providers>
      </body>
    </html>
  );
}
