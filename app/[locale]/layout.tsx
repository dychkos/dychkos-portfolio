import clsx from "clsx";
import { Inter } from "next/font/google";
import { unstable_setRequestLocale } from "next-intl/server";
import React, { ReactNode } from "react";
import { locales } from "@/config";
import Header from "@/components/Header";
import Providers from "@/app/Providers";
import Footer from "@/components/Footer";
import GetInTouch from "@/components/index/GetInTouch";

const inter = Inter({ subsets: ["latin"] });

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
      className="h-full scroll-smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={clsx(
          inter.className,
          "flex h-full flex-col bg-white dark:bg-gray-900"
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
