import clsx from 'clsx';
import { JetBrains_Mono, Onest } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { ReactNode } from 'react';
import { locales } from '@/config';
import Header from '@/components/Header';
import Providers from '@/app/Providers';
import Footer from '@/components/Footer';
import GetInTouch from '@/components/index/GetInTouch';

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
      className='h-full scroll-smooth'
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
          <Header />
          {children}
          <GetInTouch />

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
