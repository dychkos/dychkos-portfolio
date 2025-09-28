import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ua'] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export type Locale = (typeof locales)[number];
