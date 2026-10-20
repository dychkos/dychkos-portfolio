import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

import { Hash } from 'lucide-react';
import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import { cn } from '@/utils/helper';

type HeadingProps = React.ComponentPropsWithoutRef<'h2'>;

const heading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const classes: Record<number, string> = {
    1: 'mb-6 mt-11 text-[32px] font-semibold tracking-[-0.8px] text-site-ink',
    2: 'mb-3 mt-11 scroll-mt-20 text-[26px] font-semibold leading-tight tracking-[-0.5px] text-site-ink',
    3: 'mb-2.5 mt-8 scroll-mt-20 text-[20px] font-semibold leading-snug text-site-ink',
    4: 'mb-2 mt-6 scroll-mt-20 text-[17px] font-semibold text-site-ink',
    5: 'mb-2 mt-5 scroll-mt-20 text-base font-semibold text-site-ink',
    6: 'mb-1 mt-4 scroll-mt-20 text-base font-semibold text-site-ink',
  };

  const Heading = ({ id, children }: HeadingProps) => {
    const Tag = `h${level}` as 'h2';

    return (
      <a href={`#${id}`} className='group relative block no-underline'>
        <Hash className='absolute -left-6 hidden h-full p-1 text-site-accent group-hover:inline-block' />
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
    <p className='mb-[18px] text-[17px] leading-[1.7] text-site-ink'>
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className='text-site-accent underline decoration-1 underline-offset-[3px] transition-opacity hover:opacity-80'
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => (
    <code
      {...props}
      className={cn(
        'overflow-x-auto font-site-mono',
        !('data-language' in props) &&
          'rounded-[5px] bg-site-accent-soft px-1.5 py-0.5 text-[0.84em] [pre_&]:rounded-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[inherit]',
        props.className
      )}
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className='my-6 border-l-2 border-site-accent pl-4 text-site-soft [&>p]:text-site-soft'>
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className='mb-[18px] ml-6 list-disc space-y-2 text-[17px] marker:text-site-soft'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='mb-[18px] ml-6 list-decimal space-y-2 text-[17px] marker:text-site-soft'>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className='leading-[1.7] text-site-ink'>{children}</li>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      {...props}
      width={800}
      height={400}
      className='mb-6 h-auto w-full rounded-lg border border-site-line'
    />
  ),
  hr: ({ ...props }) => <hr className='my-8 border-site-line' {...props} />,
  table: ({ children, ...props }) => (
    <div className='mb-6 overflow-x-auto'>
      <table
        className='w-full border-collapse border border-site-line text-[15px]'
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className='border border-site-line bg-site-surface px-4 py-2 text-left font-semibold'
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className='border border-site-line px-4 py-2' {...props}>
      {children}
    </td>
  ),
};
