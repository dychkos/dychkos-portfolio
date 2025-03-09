import { Pathnames } from 'next-intl/navigation';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = 'en' as const;
export const locales = ['en', 'ua'] as const;

export const localePrefix = 'always'; // Default

export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    ua: '/pfadnamen',
  },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
