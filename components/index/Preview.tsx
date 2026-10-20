'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Reveal from '@/components/site/Reveal';
import { getYearsOfExperience, isWorkingHoursInUkraine } from '@/utils/helper';

const linkClass =
  'group border-b border-site-line pb-px transition-colors hover:border-site-ink';
const arrowClass =
  'inline-block transition-transform group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:transform-none';

const EXTERNAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/dychkos' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dychkos/' },
  { label: 'Instagram', href: 'https://instagram.com/dychkos' },
];

const Preview: React.FC = () => {
  const t = useTranslations('Preview');
  const tHeader = useTranslations('Header');
  const locale = useLocale();
  const years = getYearsOfExperience();
  // Computed after mount: the page is statically rendered.
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    setOnline(isWorkingHoursInUkraine());
  }, []);

  return (
    <Reveal as='section' id='hero' className='relative pt-[72px]'>
      <div
        aria-hidden
        className='site-grid-bg pointer-events-none absolute -z-10'
        style={{ inset: '0 -60px -40px' }}
      />
      <div className='flex items-center gap-4'>
        <Image
          src='/images/me.jpg'
          alt='Me'
          width={152}
          height={152}
          className='h-[76px] w-[76px] rounded-[18px] object-cover'
        />
        <div className='font-site-mono text-[12.5px] leading-relaxed text-site-soft'>
          <div>{t('locale')}</div>
          {online !== null && (
            <div className='flex items-center gap-2'>
              <span
                className={`inline-block h-[7px] w-[7px] rounded-full ${
                  online ? 'bg-site-online' : 'bg-site-soft'
                }`}
              />
              {online ? t('availability-yes') : t('availability-no')}
            </div>
          )}
        </div>
      </div>
      <h1 className='mt-7 text-balance text-[40px] font-semibold leading-[1.05] tracking-[-1.6px] sm:text-[52px]'>
        {t('greeting')}
      </h1>
      {/* The year count can change between build time and visit time. */}
      <p
        className='mt-5 max-w-[600px] text-[18px] text-site-soft'
        suppressHydrationWarning
      >
        {t('about', {
          years,
          // 'ua' is not a valid locale tag, so plural rules come from 'uk'.
          category: new Intl.PluralRules(
            locale === 'ua' ? 'uk' : locale
          ).select(years),
        })}
      </p>
      <div className='mt-7 flex flex-wrap gap-x-[22px] gap-y-3 text-[15px] font-medium'>
        <a
          href='/CV.pdf'
          target='_blank'
          rel='noopener'
          className='group border-b border-site-accent pb-px text-site-accent'
        >
          {tHeader('get-cv')} <span className={arrowClass}>↓</span>
        </a>
        {EXTERNAL_LINKS.map((link) => (
          <a key={link.label} href={link.href} className={linkClass}>
            {link.label} <span className={arrowClass}>↗</span>
          </a>
        ))}
      </div>
    </Reveal>
  );
};

export default Preview;
