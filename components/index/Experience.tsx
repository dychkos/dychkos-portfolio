import React from 'react';
import { useMessages, useTranslations } from 'next-intl';
import { AbstractIntlMessages } from 'use-intl';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

const LOGO_PLATES: Record<string, { plate: string; pad: boolean }> = {
  Appflame: { plate: '#000000', pad: false },
  NewGen: { plate: '#0f1834', pad: false },
  FluidWeb: { plate: '#ffffff', pad: true },
  GrandySoft: { plate: '#18181b', pad: true },
};
const FALLBACK_PLATE = { plate: '#ffffff', pad: true };

const Experience: React.FC = () => {
  const t = useTranslations('Experience');
  const messages = useMessages() as AbstractIntlMessages & MessagesType;
  const companies = messages.Experience.companies;

  return (
    <Reveal id='experience' className='pt-24'>
      <SectionHeading num='03' title={t('heading')} lead={t('title')} />
      <div className='mt-4'>
        {Object.keys(companies).map((key) => {
          const index = Number(key);
          const name = t(`companies.${index}.name`);
          const { plate, pad } = LOGO_PLATES[name] ?? FALLBACK_PLATE;
          return (
            <div
              key={index}
              className='draw-line group relative grid grid-cols-[44px_1fr] gap-4 py-5'
            >
              <img
                src={`/images/${name}.png`}
                alt={name}
                style={{ backgroundColor: plate }}
                className={`h-11 w-11 rounded-[11px] shadow-[inset_0_0_0_1px_var(--site-line),0_0_0_1px_var(--site-line)] ${
                  pad ? 'object-contain p-[5px]' : 'object-cover'
                }`}
              />
              <div>
                <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                  <p className='text-[17px] font-medium transition-colors group-hover:text-site-accent'>
                    {t(`companies.${index}.role`)}
                  </p>
                  <span className='font-site-mono text-[12px] text-site-soft'>
                    {t(`companies.${index}.period`)}
                  </span>
                </div>
                <p className='text-[14px] text-site-soft'>{name}</p>
                <ul className='mt-3 list-inside list-disc space-y-1 text-[15px] text-site-soft'>
                  {Object.keys(companies[index].responsibilities).map(
                    (rKey) => (
                      <li key={rKey}>
                        {t(`companies.${index}.responsibilities.${rKey}`)}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
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
