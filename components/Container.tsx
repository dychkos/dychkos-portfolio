import React, { PropsWithChildren } from "react";
import clsx from "clsx";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return (
    <div className={clsx("container px-4 lg:px-24", className)}>{children}</div>
  );
};

export default Container;
