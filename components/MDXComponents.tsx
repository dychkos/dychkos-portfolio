import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import { Hash } from 'lucide-react';
import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';

interface HeadingProps {
  id?: string;
  children: React.ReactNode;
}

const heading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const classes: Record<number, string> = {
    1: 'mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl',
    2: 'mb-4 mt-8 text-3xl font-semibold leading-tight text-foreground lg:text-4xl',
    3: 'mb-3 mt-6 text-2xl font-semibold leading-tight text-foreground lg:text-3xl',
    4: 'mb-2 mt-4 text-xl font-semibold leading-tight text-foreground',
    5: 'mb-2 mt-3 text-lg font-semibold',
    6: 'mb-1 mt-2 text-base font-semibold',
  };

  const Heading = ({ id, children }: HeadingProps) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <a href={`#${id}`} className='group relative no-underline'>
        <Hash className='absolute -left-6 hidden h-full p-1 text-cyan-500 group-hover:inline-block' />
        <Tag id={id} className={classes[level]}>
          {children}
        </Tag>
      </a>
    );
  };
  Heading.displayName = `h${level}`;
  return Heading;
};
export const mdxComponents: MDXComponents = {
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  p: ({ children }) => (
    <p className='mb-4 text-lg leading-relaxed text-foreground/90'>
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className='text-blog-accent hover:text-blog-accent/80 underline underline-offset-2 transition-colors'
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => <code {...props} className='overflow-x-auto' />,
  blockquote: ({ children }) => (
    <blockquote className='border-blog-accent bg-blog-muted my-6 rounded-r-lg border-l-4 py-4 pl-6 italic text-muted-foreground'>
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className='mb-6 ml-6 list-disc space-y-2'>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className='mb-6 ml-6 list-decimal space-y-2'>{children}</ol>
  ),
  li: ({ children }) => (
    <li className='leading-relaxed text-foreground/90'>{children}</li>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      {...props}
      width={800}
      height={400}
      className='mb-6 h-auto w-full rounded-lg'
    />
  ),
  hr: ({ ...props }) => <hr className='my-8 border-border' {...props} />,
  table: ({ children, ...props }) => (
    <div className='mb-6 overflow-x-auto'>
      <table className='w-full border-collapse border border-border' {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className='border border-border bg-muted px-4 py-2 text-left font-semibold'
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className='border border-border px-4 py-2' {...props}>
      {children}
    </td>
  ),
};
