'use client';
import Container from '@/components/Container';
import Heading from '@/components/partials/Heading';
import Heading2 from '@/components/ui/typography/Heading2';
import React, { useState } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaThreads } from 'react-icons/fa6';
import { BsCopy } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { LiaTelegram } from 'react-icons/lia';
import Body1 from '@/components/ui/typography/Body1';
import { Separator } from '@/components/ui/separator';

const EMAIL = 'dychkos@proton.me';
const PHONE = "'+380734042536";

export const GetInTouch: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const [showPhoneEggs, setShowPhoneEggs] = useState<boolean>(false);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setShowPhoneEggs((prev) => !prev);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const t = useTranslations('GetInTouch');

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy email: ', err));
  };

  const handleCopyPhone = () => {
    navigator.clipboard
      .writeText(PHONE)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy phone: ', err));
  };
  return (
    <Container id='contact' className='pb-12 pt-7'>
      <Separator className='mb-[64px] mt-[24px]' />

      <Heading>{t('heading')}</Heading>
      <Heading2 className='mx-auto mb-8 mt-4 max-w-xl text-center'>
        {t('title')}
      </Heading2>
      <div className='relative p-4'>
        {copied && (
          <span className='absolute -top-4 right-2/4 mx-auto translate-x-2/4 whitespace-nowrap rounded-full bg-gray-300 px-2.5 py-0.5 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-50'>
            {t('copied')}
          </span>
        )}
        <div className='mx-auto flex flex-col items-center justify-center'>
          <span
            className='relative flex w-max flex-row items-center justify-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100 md:gap-6 md:text-4xl'
            onClick={handleCopyEmail}
            title={t('email')}
          >
            <FiMail size={28} />
            {EMAIL}
            <BsCopy
              size={28}
              className='ml-2 cursor-pointer hover:text-blue-500'
            />
          </span>
          <span
            className='relative mt-4 flex w-max flex-row items-center justify-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100 md:gap-6 md:text-4xl'
            onClick={handleCopyPhone}
            title={t('phone')}
          >
            <FiPhone size={28} />
            <div className='relative'>
              <p
                className={`transition-opacity duration-1000 ${
                  showPhoneEggs ? 'invisible opacity-0' : 'visible opacity-100'
                }`}
                style={{
                  position: showPhoneEggs ? 'absolute' : 'relative',
                  top: 0,
                  left: 0,
                }}
              >
                + 380 73 404 25 36
              </p>
              <p
                className={`transition-opacity duration-1000 ${
                  showPhoneEggs ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                style={{
                  position: showPhoneEggs ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                + 380 73 <span className='text-red-400'>404</span>{' '}
                <span className='bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent'>
                  5&#178; 6&#178;
                </span>
              </p>
            </div>
            <BsCopy
              size={28}
              className='ml-2 cursor-pointer hover:text-blue-500'
            />
          </span>
        </div>
      </div>
      <Heading2 className='mt-12 text-center'>{t('other')}</Heading2>
      <Body1 className='mt-4 flex flex-row justify-center gap-2'>
        <Link href='https://www.threads.net/@dychkos'>
          <FaThreads size={24} />
        </Link>
        <Link href='https://x.com/SerhiiDychko'>
          <FaXTwitter size={24} />
        </Link>
        <Link href='https://t.me/dychkos/'>
          <LiaTelegram size={24} />
        </Link>
      </Body1>
    </Container>
  );
};

export default GetInTouch;
