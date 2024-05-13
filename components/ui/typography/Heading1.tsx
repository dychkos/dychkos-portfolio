import React, { PropsWithChildren } from "react";
import { WithClassName } from "@/components/props.type";
import { cn } from "@/utils/helper";

const Heading1: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <h1
      className={cn(
        "tracking-normal text-4xl font-semibold md:text-5xl md:font-bold lg:text-6xl md:tracking-tight text-gray-900 dark:text-gray-50",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading1;
