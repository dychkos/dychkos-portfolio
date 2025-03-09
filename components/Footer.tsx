import React from 'react';
import Container from '@/components/Container';
import { useTranslations } from 'next-intl';
import Body1 from '@/components/ui/typography/Body1';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  return (
    <footer className='bg-gray-100 py-4 dark:bg-gray-950'>
      <Container className='flex justify-center'>
        <Body1 className='text-center'>
          &copy; {new Date().getFullYear()} | {t('main')}
        </Body1>
      </Container>
    </footer>
  );
};

export default Footer;
