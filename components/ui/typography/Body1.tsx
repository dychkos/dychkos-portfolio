import React, { PropsWithChildren } from 'react';
import { WithClassName } from '@/components/props.type';
import { cn } from '@/utils/helper';

const Body1: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        'text-base font-normal text-gray-900 dark:text-gray-50 lg:text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

export default Body1;
