'use client';
import React, { PropsWithChildren } from 'react';
import { cn } from '@/utils/helper';

interface RegularButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const RegularButton: React.FC<RegularButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl bg-gray-900 px-4 py-1.5 font-medium text-white transition duration-150 ease-out hover:bg-gray-700 hover:ease-in dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200',
        className
      )}
    >
      {children}
    </button>
  );
};

export default RegularButton;
