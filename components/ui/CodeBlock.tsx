'use client';

import { Check, Clipboard } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';

export default function CodeBlock({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  return (
    <pre
      ref={preRef}
      {...props}
      className='relative my-5 overflow-x-auto rounded-xl border border-site-line bg-site-surface px-4 pb-4 pt-12 font-site-mono text-[13px] leading-[1.6] text-site-ink'
    >
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className='absolute right-3 top-3 z-10 inline-flex size-7 items-center justify-center rounded-md text-site-soft transition-colors hover:bg-site-accent-soft hover:text-site-ink disabled:cursor-default'
      >
        {isCopied ? <Check /> : <Clipboard />}
      </button>
      {children}
    </pre>
  );
}
