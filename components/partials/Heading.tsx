import React, { PropsWithChildren } from 'react';

interface HeadingProps extends PropsWithChildren {}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <span className='mx-auto block w-max rounded-xl bg-gray-200 px-5 py-1 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-200'>
      {children}
    </span>
  );
};

export default Heading;
