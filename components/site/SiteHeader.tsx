'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import BurgerButton from '@/components/ui/BurgerButton';
import LocaleToggle from '@/components/site/LocaleToggle';
import ThemeToggle from '@/components/site/ThemeToggle';
import { useChapter } from '@/components/site/ChapterProvider';
import { cn } from '@/utils/helper';

const navLinkClass = 'text-site-soft transition-colors hover:text-site-ink';

const SiteHeader: React.FC = () => {
  const t = useTranslations('Header');
  const { label } = useChapter();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpened);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpened]);

  const hide = () => setIsOpened(false);

  return (
    <header className='sticky top-0 z-10 border-b border-site-line bg-[color-mix(in_oklab,var(--site-bg)_82%,transparent)] backdrop-blur-md'>
      <div className='relative mx-auto flex w-full max-w-[1080px] items-center gap-5 px-6 py-3 text-[14px]'>
        <Link href='/' onClick={hide} className='font-semibold'>
          dychkos
        </Link>
        <span
          className={cn(
            'hidden truncate font-site-mono text-[12px] text-site-soft',
            label && 'md:inline'
          )}
        >
          {label}
        </span>

        <div className='ml-auto flex items-center gap-5'>
          <nav
            className={cn(
              'absolute left-0 right-0 top-full flex-col gap-4 border-b border-site-line bg-site-bg px-6 py-4 md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0',
              isOpened ? 'flex' : 'hidden'
            )}
          >
            <Link href='/#about' onClick={hide} className={navLinkClass}>
              {t('about')}
            </Link>
            <Link href='/#experience' onClick={hide} className={navLinkClass}>
              {t('experience')}
            </Link>
            <Link href='/blog' onClick={hide} className={navLinkClass}>
              {t('blog')}
            </Link>
            <Link href='/#contact' onClick={hide} className={navLinkClass}>
              {t('contact')}
            </Link>
            <a
              href='/CV.pdf'
              target='_blank'
              rel='noopener'
              onClick={hide}
              className='font-medium text-site-accent'
            >
              {t('get-cv')} ↓
            </a>
          </nav>
          <LocaleToggle />
          <ThemeToggle />
          <BurgerButton
            isOpened={isOpened}
            onClick={() => setIsOpened((state) => !state)}
            className='md:hidden'
          />
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
