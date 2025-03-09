import Container from '@/components/Container';
import Heading from '@/components/partials/Heading';
import React from 'react';
import Body2 from '@/components/ui/typography/Body2';
import Heading3 from '@/components/ui/typography/Heading3';
import Heading2 from '@/components/ui/typography/Heading2';
import { useTranslations } from 'next-intl';

export const Skills: React.FC = () => {
  const t = useTranslations('Skills');
  return (
    <Container className='py-16 lg:py-24' id='skills'>
      <Heading>{t('heading')}</Heading>
      <Heading2 className='mt-4 text-center'>{t('title')}</Heading2>
      <div className='mt-12 grid grid-cols-3 justify-center gap-y-12 md:grid-cols-4'>
        {skillsData.map((skill) => (
          <div
            key={skill.title}
            className='mx-auto flex flex-col items-center justify-center gap-2'
          >
            <div className='flex h-16 w-16 items-center justify-center'>
              <img src={`/images/${skill.image}`} alt={skill.title} />
            </div>

            <Body2>{skill.title}</Body2>
          </div>
        ))}
      </div>
      <Heading3 className='mt-12 text-center'>
        {t('combo')}&nbsp;
        <span className='block bg-gradient-to-r from-yellow-700 to-yellow-400 bg-clip-text text-transparent sm:inline'>
          Laravel + React
        </span>
      </Heading3>
    </Container>
  );
};

const skillsData = [
  {
    title: 'JavaScript',
    image: 'icon-javscript.svg',
  },
  {
    title: 'Laravel',
    image: 'icon-laravel.svg',
  },
  {
    title: 'NodeJS',
    image: 'icon-node-js.svg',
  },
  {
    title: 'React',
    image: 'icon-react.svg',
  },
  {
    title: 'Vue',
    image: 'icon-vue.svg',
  },
  {
    title: 'Docker',
    image: 'icon-docker.svg',
  },
  {
    title: 'PostgreSQL',
    image: 'icon-postgresql.svg',
  },
  {
    title: 'MongoDB',
    image: 'icon-mongodb.svg',
  },
];

export default Skills;
