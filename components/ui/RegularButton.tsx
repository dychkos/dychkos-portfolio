"use client";
import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/helper";

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
        "transition duration-150 ease-out dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 hover:ease-in hover:bg-gray-700 bg-gray-900 font-medium text-white px-4 py-1.5 rounded-xl",
        className
      )}
    >
      {children}
    </button>
  );
};

export default RegularButton;
