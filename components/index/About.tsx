import React from 'react';
import Heading from '@/components/partials/Heading';
import Container from '@/components/Container';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Heading3 from '@/components/ui/typography/Heading3';
import Body1 from '@/components/ui/typography/Body1';
import Link from 'next/link';

const About: React.FC = () => {
  const t = useTranslations('About');

  return (
    <div className='bg-gray-50 py-16 dark:bg-gray-950 lg:py-24' id='about'>
      <Container>
        <Heading>{t('heading')}</Heading>

        <div className='mt-12 flex flex-col items-center gap-12 md:flex-row md:items-start xl:gap-[192px]'>
          <div className='relative w-72 min-w-80'>
            <div className='absolute left-5 top-5 z-0 h-80 w-[320px] bg-gray-400 md:h-[480px]'></div>

            <Image
              src='/images/me-vertical.jpg'
              alt='Me'
              width={2000}
              height={3000}
              className='relative mx-auto h-80 object-cover md:h-auto'
              style={{ zIndex: '1' }}
            />
          </div>

          <div>
            <Heading3 className='mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100'>
              {t('title')}
            </Heading3>

            {Array(2)
              .fill(false)
              .map((el, index) => (
                <Body1 className='mb-4' key={index}>
                  {t(`body.${index}`)}
                </Body1>
              ))}
            <Body1 className='mb-4'>{t('avocation')}</Body1>
            <div className='mb-4 flex flex-row gap-4'>
              <Link
                href='https://www.runtastic.com/user/Q59CQ2ZBAVRS3NZN'
                className='flex items-center gap-2 rounded-lg bg-gray-200 p-2 dark:bg-gray-600'
              >
                <Image
                  src='/images/adidas-logo.svg'
                  height={32}
                  width={32}
                  alt='Adidas Running'
                />{' '}
                {t('running')}
              </Link>
              <Link
                href='https://hevy.com/user/dychkos'
                className='flex items-center gap-2 rounded-lg bg-gray-200 p-2 dark:bg-gray-600'
              >
                <img
                  src='/images/hevy-logo.svg'
                  height={32}
                  width={32}
                  alt='Hevy sport'
                />{' '}
                {t('sport')}
              </Link>
            </div>
            <Body1 className='mb-4'>{t('summary')}</Body1>
            <ul className='grid list-inside list-disc grid-cols-1 grid-rows-2 gap-x-2.5 md:grid-cols-2'>
              {Array(4)
                .fill(false)
                .map((skill, index) => (
                  <li
                    className='text-base text-gray-900 dark:text-gray-200 lg:text-lg'
                    key={index}
                  >
                    {t(`main.${index}`)}
                  </li>
                ))}
            </ul>
            <Body1 className='mt-4'>{t('last-thing')}</Body1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
