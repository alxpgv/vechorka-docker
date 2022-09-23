import React, { PropsWithChildren } from "react";
import cn from "clsx";

interface ContainerProps extends PropsWithChildren {
  className?: string;
  fullHeight?: boolean;
}

export const Container = ({
  children,
  className = "",
  fullHeight = false,
}: ContainerProps) => {
  return (
    <div className={cn("container", className, fullHeight && "min-h-screen")}>
      {children}
    </div>
  );
};
