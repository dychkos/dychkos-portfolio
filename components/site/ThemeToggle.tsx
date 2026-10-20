'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';

const ThemeToggle: React.FC = () => {
  const t = useTranslations('Header');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type='button'
      aria-label={t('switch-theme')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='rounded-lg border border-site-line px-2 py-1 text-site-soft transition-colors hover:text-site-ink'
    >
      {mounted ? (
        isDark ? (
          <RiSunLine size={16} />
        ) : (
          <RiMoonLine size={16} />
        )
      ) : (
        <span className='block h-4 w-4' />
      )}
    </button>
  );
};

export default ThemeToggle;
