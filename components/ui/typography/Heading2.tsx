import React, { PropsWithChildren } from 'react';
import { WithClassName } from '@/components/props.type';
import { cn } from '@/utils/helper';

const Heading2: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <h2 className={cn('text-xl text-gray-600 dark:text-gray-400', className)}>
      {children}
    </h2>
  );
};

export default Heading2;
