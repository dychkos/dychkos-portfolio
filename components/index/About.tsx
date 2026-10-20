import React from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

const chipClass =
  'inline-flex items-center gap-2 rounded-[10px] border border-site-line bg-site-surface px-3 py-2 text-[15px] transition-colors hover:border-site-accent hover:text-site-accent';

const CHIPS = [
  {
    key: 'running',
    href: 'https://www.runtastic.com/user/Q59CQ2ZBAVRS3NZN',
    logo: '/images/adidas-logo.svg',
  },
  {
    key: 'sport',
    href: 'https://hevy.com/user/dychkos',
    logo: '/images/hevy-logo.svg',
  },
] as const;

const About: React.FC = () => {
  const t = useTranslations('About');

  return (
    <Reveal as='section' id='about' className='pt-24'>
      <SectionHeading num='01' title={t('heading')} lead={t('title')} />
      <div className='mt-6 space-y-4 text-[16px] leading-[1.7]'>
        <p>{t('body.0')}</p>
        <p>{t('body.1')}</p>
        <p>{t('avocation')}</p>
        <div className='flex flex-wrap gap-3'>
          {CHIPS.map((chip) => (
            <a key={chip.key} href={chip.href} className={chipClass}>
              <span
                className='logo-mask h-[22px] w-[22px]'
                style={{ '--src': `url(${chip.logo})` } as React.CSSProperties}
                aria-hidden
              />
              {t(chip.key)}
            </a>
          ))}
        </div>
        <p>{t('summary')}</p>
        <ul className='grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2'>
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className='flex gap-2.5'>
              <span className='text-site-soft' aria-hidden>
                –
              </span>
              {t(`main.${index}`)}
            </li>
          ))}
        </ul>
        <p>{t('last-thing')}</p>
      </div>
    </Reveal>
  );
};

export default About;
