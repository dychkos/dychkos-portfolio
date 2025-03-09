import React, { PropsWithChildren } from 'react';
import { WithClassName } from '@/components/props.type';
import { cn } from '@/utils/helper';

const Subtitle: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <h3 className={cn('text-xl text-gray-900 dark:text-gray-50', className)}>
      {children}
    </h3>
  );
};

export default Subtitle;
