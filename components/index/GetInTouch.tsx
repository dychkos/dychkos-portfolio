'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import PhoneEgg from '@/components/site/PhoneEgg';
import { EMAIL, PHONE_RAW } from '@/lib/site/phone';

const COPIED_MS = 1400;
const TAP_MS = 2200;

const rowClass =
  'flex w-full cursor-pointer flex-wrap justify-between gap-x-4 gap-y-1 py-3.5 text-left';
const linkClass =
  'underline decoration-site-line underline-offset-4 transition-colors hover:text-site-accent hover:decoration-site-accent';

const LINKS = [
  { label: 'Threads', href: 'https://www.threads.net/@dychkos' },
  { label: 'X', href: 'https://x.com/SerhiiDychko' },
  { label: 'Telegram', href: 'https://t.me/dychkos/' },
];

export const GetInTouch: React.FC = () => {
  const t = useTranslations('GetInTouch');
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const tapTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current);
      clearTimeout(tapTimer.current);
    },
    []
  );

  const copy = (kind: 'email' | 'phone', value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(kind);
        clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(null), COPIED_MS);
      })
      .catch((err) => console.error(`Failed to copy ${kind}: `, err));
  };

  const onTouchStart = () => {
    setTapped(true);
    clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => setTapped(false), TAP_MS);
  };

  return (
    <Reveal as='section' id='contact' className='pb-24 pt-24'>
      <SectionHeading num='05' title={t('heading')} lead={t('title')} />
      <div className='mt-6 rounded-2xl border border-site-line bg-site-surface px-[26px] py-1.5'>
        <button
          type='button'
          className={rowClass}
          onClick={() => copy('email', EMAIL)}
        >
          <span className='text-[17px] font-medium'>{EMAIL}</span>
          <span
            aria-live='polite'
            className='font-site-mono text-[12px] text-site-soft'
          >
            {copied === 'email' ? t('copied') : t('email')}
          </span>
        </button>
        <div className='border-t border-site-line' />
        <button
          type='button'
          className={rowClass}
          onClick={() => copy('phone', PHONE_RAW)}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') setHovered(true);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') setHovered(false);
          }}
          onTouchStart={onTouchStart}
        >
          <span className='text-[17px] font-medium'>
            <PhoneEgg active={hovered || tapped} />
          </span>
          <span
            aria-live='polite'
            className='font-site-mono text-[12px] text-site-soft'
          >
            {copied === 'phone' ? t('copied') : t('phone')}
          </span>
        </button>
      </div>
      <p className='mt-8 text-[15px] text-site-soft'>{t('other')}</p>
      <div className='mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[16px]'>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className={linkClass}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </Reveal>
  );
};

export default GetInTouch;
