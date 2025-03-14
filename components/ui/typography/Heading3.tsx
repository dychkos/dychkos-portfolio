import React, { PropsWithChildren } from 'react';
import { WithClassName } from '@/components/props.type';
import { cn } from '@/utils/helper';

const Heading3: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 lg:text-3xl',
        className
      )}
    >
      {children}
    </h3>
  );
};

export default Heading3;
