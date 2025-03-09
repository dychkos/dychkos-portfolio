import React, { PropsWithChildren } from 'react';
import { WithClassName } from '@/components/props.type';
import { cn } from '@/utils/helper';

const Heading1: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <h1
      className={cn(
        'text-4xl font-semibold tracking-normal text-gray-900 dark:text-gray-50 md:text-5xl md:font-bold md:tracking-tight lg:text-6xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading1;
