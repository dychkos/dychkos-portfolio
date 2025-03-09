'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { RiMapPin2Line } from 'react-icons/ri';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { cn, isWorkingHoursInUkraine } from '@/utils/helper';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import Body1 from '@/components/ui/typography/Body1';

interface PreviewProps {
  className?: string;
}

const Preview: React.FC<PreviewProps> = ({ className }) => {
  const t = useTranslations('Preview');
  const isWorkHours = isWorkingHoursInUkraine();

  return (
    <Container
      className={clsx(
        'flex flex-col-reverse justify-between gap-12 py-16 md:flex-row lg:py-24',
        className
      )}
    >
      <div>
        <h1 className='text-5xl font-bold text-gray-900 dark:text-gray-100 md:text-7xl'>
          {t('greeting')}
        </h1>
        <Body1 className='mt-3 max-w-3xl'>{t('about')}</Body1>
        <Body1 className='mb-2 mt-12 flex flex-row items-center gap-2 text-gray-600 dark:text-gray-100'>
          <RiMapPin2Line />
          {t('locale')}
        </Body1>
        <Body1
          className={cn([isWorkHours ? 'text-green-700' : 'text-red-800'])}
        >
          • {isWorkHours ? t('availability-yes') : t('availability-no')}
        </Body1>
        <Body1 className='mt-12 flex flex-row gap-2'>
          <Link href='https://github.com/dychkos'>
            <FiGithub size={24} />
          </Link>
          <Link href='https://www.linkedin.com/in/dychkos/'>
            <FaLinkedinIn size={24} />
          </Link>
          <Link href='https://instagram.com/dychkos'>
            <FaInstagram size={24} />
          </Link>
        </Body1>
      </div>
      <div className='flex justify-center md:justify-start'>
        <div className='relative h-80 w-72'>
          <div className='absolute left-5 top-5 z-0 h-[280px] w-[280px] bg-gray-400'></div>

          <Image
            src='/images/me.jpg'
            alt='Me'
            width={500}
            height={500}
            className='relative mx-auto h-[280px] w-[280px] object-cover'
            style={{ zIndex: '1' }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Preview;
