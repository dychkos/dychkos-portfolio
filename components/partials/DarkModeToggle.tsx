'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import Body1 from '@/components/ui/typography/Body1';
import { useTranslations } from 'next-intl';

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // To handle hydration mismatch
  const t = useTranslations('Header');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className='flex w-full flex-row items-center justify-between rounded transition duration-150 ease-out hover:bg-gray-100 hover:ease-in dark:hover:bg-gray-900 md:w-auto md:p-2'>
        <Body1 className='md:hidden'>{t('switch-theme')}</Body1>
        <div className='h-6 w-6' /> {/* Placeholder for the icon */}
      </button>
    );
  }

  return (
    <button
      className='flex w-full flex-row items-center justify-between rounded transition duration-150 ease-out hover:bg-gray-100 hover:ease-in dark:hover:bg-gray-900 md:w-auto md:p-2'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={t('switch-theme')}
    >
      <Body1 className='md:hidden'>{t('switch-theme')}</Body1>
      {theme === 'light' ? (
        <RiMoonLine className='h-6 w-6 text-gray-600' />
      ) : (
        <RiSunLine className='h-6 w-6 text-gray-300' />
      )}
    </button>
  );
};

export default DarkModeToggle;
