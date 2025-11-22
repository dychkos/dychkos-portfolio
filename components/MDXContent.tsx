import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './MDXComponents';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className='prose prose-lg max-w-none'>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: 'nord',
                  keepBackground: true,
                  defaultLang: 'plaintext',
                },
              ],
            ],
            remarkPlugins: [],
          },
        }}
      />
    </div>
  );
}
