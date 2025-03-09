import React from 'react';
import Container from '@/components/Container';
import Heading from '@/components/partials/Heading';
import Heading2 from '@/components/ui/typography/Heading2';
import Heading3 from '@/components/ui/typography/Heading3';
import Body2 from '@/components/ui/typography/Body2';
import { GoLinkExternal } from 'react-icons/go';
import Link from 'next/link';
import { cn } from '@/utils/helper';

const Work: React.FC = () => {
  return (
    <Container className='py-16 lg:py-24' id='work'>
      <Heading>Work</Heading>
      <Heading2 className='mt-4 text-center'>
        Some of the noteworthy projects I have built:
      </Heading2>
      <div className='mt-12 flex flex-col gap-12'>
        {projects.map((project, index) => (
          <div
            key={project.title}
            className='grid grid-cols-1 gap-0 overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-900 md:grid-cols-2'
          >
            <div
              className={cn(
                'bg-gray-100 p-8 dark:bg-gray-700 md:p-12',
                index % 2 !== 0 && 'order-last'
              )}
            >
              <img
                className='w-full'
                src={`/images/${project.image}`}
                alt={project.title}
              />
            </div>
            <div className='p-8 dark:bg-gray-800 md:p-12'>
              <Heading3 className='mb-6'>{project.title}</Heading3>
              <Body2 className='mb-6'>{project.body}</Body2>
              <div className='mb-6 flex flex-row flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    className='rounded-xl bg-gray-200 px-5 py-1 text-sm font-medium text-gray-900 dark:bg-gray-600 dark:text-white'
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.link}
                className='rouned block w-max p-2 transition duration-150 ease-out hover:bg-gray-100 hover:ease-in dark:hover:bg-gray-900'
              >
                <GoLinkExternal className='text-gray-900 dark:text-white' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const projects = [
  {
    image: 'mock-website.png',
    title: 'Test',
    body:
      'CRAFTING WEBSITES THAT ELEVATE YOUR BRAND.\n' +
      "We transform your brand's vision into a reality, creating responsive websites that engage users and drive conversions and elevate your brand to achieve your business goals.\n" +
      'Request Demo.',
    tags: ['html', 'css', 'js', 'php', 'c++'],
    link: 'https://google.com',
  },
  {
    image: 'mock-website.png',
    title: 'Test',
    body:
      'CRAFTING WEBSITES THAT ELEVATE YOUR BRAND.\n' +
      "We transform your brand's vision into a reality, creating responsive websites that engage users and drive conversions and elevate your brand to achieve your business goals.\n" +
      'Request Demo.',
    tags: ['html', 'css', 'js', 'php', 'c++'],
    link: 'https://google.com',
  },
];

export default Work;
