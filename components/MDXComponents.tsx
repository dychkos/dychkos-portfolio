import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className='mb-6 text-4xl font-bold leading-tight text-foreground lg:text-5xl'>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className='mb-4 mt-8 text-3xl font-semibold leading-tight text-foreground lg:text-4xl'>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className='mb-3 mt-6 text-2xl font-semibold leading-tight text-foreground lg:text-3xl'>
      {children}
    </h3>
  ),
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
  blockquote: ({ children }) => (
    <blockquote className='border-blog-accent bg-blog-muted my-6 rounded-r-lg border-l-4 py-4 pl-6 italic text-muted-foreground'>
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isInlineCode = !className;

    if (isInlineCode) {
      return (
        <code className='text-blog-accent dark:text-blog-accent-light rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'>
          {children}
        </code>
      );
    }

    return (
      <code
        className={` ${className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className='bg-code-background text-code-foreground my-6 overflow-x-auto rounded-lg border p-6'>
      {children}
    </pre>
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
