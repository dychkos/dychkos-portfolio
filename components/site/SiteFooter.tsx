import React from 'react';
import { useTranslations } from 'next-intl';

const SiteFooter: React.FC = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='mx-auto mt-auto w-full max-w-[1080px] border-t border-site-line px-6 pb-10 pt-6'>
      <div className='flex items-center justify-between text-[13px] text-site-soft'>
        <span>{t('main')}</span>
        <span className='font-site-mono'>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default SiteFooter;
