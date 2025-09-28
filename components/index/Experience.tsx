import React from 'react';
import Container from '@/components/Container';
import Heading from '@/components/partials/Heading';
import Heading2 from '@/components/ui/typography/Heading2';
import { useMessages, useTranslations } from 'next-intl';
import { AbstractIntlMessages } from 'use-intl';

const Experience: React.FC = () => {
  const t = useTranslations('Experience');
  const messages = useMessages() as AbstractIntlMessages & MessagesType;

  return (
    <div className='bg-gray-50 py-16 dark:bg-gray-950 lg:py-24' id='experience'>
      <Container>
        <Heading>{t('heading')}</Heading>
        <Heading2 className='mb-8 mt-4 text-center'>{t('title')}</Heading2>
        {Array(4)
          .fill(false)
          .map((el, index) => {
            return (
              <div
                key={index}
                className='mx-auto mb-8 flex max-w-4xl flex-col gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-900 lg:flex-row lg:gap-12'
              >
                <div className='mb-2 flex items-center'>
                  <img
                    src={`/images/${t(`companies.${index}.name`)}.png`}
                    alt={t(`companies.${index}.name`)}
                    className='mr-2 max-w-32 rounded-xl bg-gray-50 dark:bg-gray-900'
                  />
                </div>
                <div className='flex-grow'>
                  <p className='mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50'>
                    {t(`companies.${index}.role`)}
                  </p>
                  <ul className='list-inside list-disc'>
                    {Object.keys(
                      messages.Experience.companies[index].responsibilities
                    ).map((key) => (
                      <li
                        key={key}
                        className='mb-1 text-gray-900 dark:text-gray-50'
                      >
                        {t(`companies.${index}.responsibilities.${key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className='mb-4 whitespace-nowrap text-gray-500'>
                    {t(`companies.${index}.period`)}
                  </p>
                </div>
              </div>
            );
          })}
      </Container>
    </div>
  );
};

type MessagesType = {
  Experience: {
    companies: {
      [index: number]: {
        responsibilities: {
          [key: string]: string;
        };
      };
    };
  };
};

export default Experience;
