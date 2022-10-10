import React, { PropsWithChildren } from "react";
import cn from "clsx";

interface Props extends PropsWithChildren {
  className?: string;
  fullHeight?: boolean;
}

export const Container = ({
  children,
  className = "",
  fullHeight = false,
}: Props) => {
  return (
    <div className={cn("container", className, fullHeight && "min-h-screen")}>
      {children}
    </div>
  );
};
