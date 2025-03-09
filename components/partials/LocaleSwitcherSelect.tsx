'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/lib/navigation';
import Body1 from '@/components/ui/typography/Body1';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        'relative flex w-full flex-row items-center justify-between text-gray-900 dark:text-gray-100 md:w-auto',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <Body1 className='md:hidden'>{label}</Body1>
      <select
        className='inline-flex cursor-pointer appearance-none rounded bg-transparent py-2 pl-2 pr-6 hover:bg-gray-100 dark:hover:bg-gray-900'
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className='pointer-events-none absolute right-1 top-[8px]'>▼</span>
    </label>
  );
}
