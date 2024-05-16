import React, { PropsWithChildren } from "react";
import clsx from "clsx";

interface ContainerProps extends PropsWithChildren {
  className?: string;
  id?: string;
}

const Container: React.FC<ContainerProps> = ({ className, children, id }) => {
  return (
    <div className={clsx("container px-4 lg:px-24", className)} id={id ?? ""}>
      {children}
    </div>
  );
};

export default Container;
