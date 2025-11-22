'use client';
import React, { useEffect, useState } from 'react';
import DarkModeToggle from '@/components/partials/DarkModeToggle';
import RegularButton from '@/components/ui/RegularButton';
import LocaleSwitcher from '@/components/partials/LocaleSwitcher';
import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import BurgerButton from '@/components/ui/BurgerButton';
import { cn } from '@/utils/helper';
import { Link } from '@/lib/navigation';

const Header: React.FC = () => {
  const t = useTranslations('Header');
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (isOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpened]);

  const hide = () => setIsOpened(false);

  return (
    <Container className='flex flex-row items-center justify-between py-4 md:py-4'>
      <Link href='/' className='text-3xl font-bold dark:text-white'>
        &lt;dy /&gt;
      </Link>

      <div
        className={cn(
          'absolute left-0 top-16 z-50 h-screen w-full flex-col items-center bg-white px-4 pt-2 dark:bg-gray-900 md:relative md:left-0 md:top-0 md:flex md:h-auto md:w-auto md:flex-row md:bg-transparent',
          [isOpened ? 'flex' : 'hidden']
        )}
      >
        <ul className='flex w-full flex-col gap-4 whitespace-nowrap border-y-2 border-gray-300 py-4 md:w-auto md:flex-row md:gap-6 md:border-y-0 md:border-r-2 md:py-0 md:pr-6'>
          <li className='text-base font-medium text-gray-600 dark:text-gray-300'>
            <Link href='/#about' onClick={hide}>
              {t('about')}
            </Link>
          </li>
          <li className='text-base font-medium text-gray-600 dark:text-gray-300'>
            <Link href='/#experience' onClick={hide}>
              {t('experience')}
            </Link>
          </li>
          <li className='text-base font-medium text-gray-600 dark:text-gray-300'>
            <Link href={`/blog`} onClick={hide}>
              {t('blog')}
            </Link>
          </li>
          <li className='text-base font-medium text-gray-600 dark:text-gray-300'>
            <Link href='/#contact' onClick={hide}>
              {t('contact')}
            </Link>
          </li>
        </ul>
        <div className='my-4 flex w-full flex-col items-center gap-4 md:my-0 md:ml-6 md:flex-row'>
          <DarkModeToggle />
          <LocaleSwitcher />
          <RegularButton
            className='w-full md:w-auto'
            onClick={() => window.open('/CV.pdf')}
          >
            {t('get-cv')}
          </RegularButton>
        </div>
      </div>

      <BurgerButton
        isOpened={isOpened}
        onClick={() => setIsOpened((state) => !state)}
        className='block md:hidden'
      />
    </Container>
  );
};

export default Header;
