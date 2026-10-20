import React from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

export const Skills: React.FC = () => {
  const t = useTranslations('Skills');
  return (
    <Reveal id='skills' className='pt-24'>
      <SectionHeading num='02' title={t('heading')} lead={t('title')} />
      <div className='mt-7 grid grid-cols-2 border-l border-t border-site-line sm:grid-cols-4'>
        {skillsData.map((skill) => (
          <div
            key={skill.title}
            className='group flex flex-col items-center gap-2.5 border-b border-r border-site-line px-2.5 pb-[14px] pt-[18px] transition-colors hover:bg-site-accent-soft'
          >
            <img
              src={`/images/${skill.image}`}
              alt={skill.title}
              className={`h-[34px] w-[34px] transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${
                skill.darkImage ? 'dark:hidden' : ''
              }`}
            />
            {skill.darkImage && (
              <img
                src={`/images/${skill.darkImage}`}
                alt={skill.title}
                className='hidden h-[34px] w-[34px] transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none dark:block'
              />
            )}
            <span className='text-[13px] text-site-soft transition-colors group-hover:text-site-ink'>
              {skill.title}
            </span>
          </div>
        ))}
      </div>
      <p className='mt-6 text-[17px]'>
        {t('combo')}{' '}
        <span className='font-semibold text-site-accent'>Laravel + React</span>
      </p>
    </Reveal>
  );
};

interface SkillItem {
  title: string;
  image: string;
  darkImage?: string;
}

const skillsData: SkillItem[] = [
  { title: 'JavaScript', image: 'icon-javscript.svg' },
  { title: 'Laravel', image: 'icon-laravel.svg' },
  { title: 'NodeJS', image: 'icon-node-js.svg' },
  { title: 'React', image: 'icon-react.svg' },
  { title: 'Vue', image: 'icon-vue.svg' },
  { title: 'Docker', image: 'icon-docker.svg' },
  { title: 'MySQL', image: 'icon-mysql.svg' },
  {
    title: 'Elasticsearch',
    image: 'icon-elasticsearch.svg',
    darkImage: 'icon-elasticsearch-dark.svg',
  },
];

export default Skills;
