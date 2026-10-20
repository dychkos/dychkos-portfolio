'use client';
import React, { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/config';
import { usePathname, useRouter } from '@/lib/navigation';

const LocaleToggle: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const other = locales.find((cur: string) => cur !== locale) ?? locale;

  return (
    <button
      type='button'
      disabled={isPending}
      aria-label={t('LocaleSwitcher.label')}
      onClick={() =>
        startTransition(() => {
          router.replace(pathname, { locale: other });
        })
      }
      className='rounded-lg border border-site-line px-2 py-1 font-site-mono text-[12px] text-site-soft transition-colors hover:text-site-ink disabled:opacity-60'
    >
      {t('LocaleSwitcher.locale', { locale: other })}
    </button>
  );
};

export default LocaleToggle;
