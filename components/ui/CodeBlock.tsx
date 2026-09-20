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
      className='relative my-5 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 pb-4 pt-12 text-sm leading-6 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100'
    >
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className='absolute right-3 top-3 z-10 inline-flex size-7 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 disabled:cursor-default dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      >
        {isCopied ? <Check /> : <Clipboard />}
      </button>
      {children}
    </pre>
  );
}
