import React, { PropsWithChildren } from "react";
import { WithClassName } from "@/components/props.type";
import { cn } from "@/utils/helper";

const Body3: React.FC<WithClassName & PropsWithChildren> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-gray-900 dark:text-gray-50",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Body3;
