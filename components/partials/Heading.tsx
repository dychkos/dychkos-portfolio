import React, { PropsWithChildren } from "react";

interface HeadingProps extends PropsWithChildren {}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <span className="block mx-auto w-max rounded-xl dark:text-gray-200 text-gray-600 dark:bg-gray-800 bg-gray-200 py-1 px-5 text-sm font-medium">
      {children}
    </span>
  );
};

export default Heading;
