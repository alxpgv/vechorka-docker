import React from "react";
import cn from "clsx";

interface Props {
  ids: number[] | string[];
  title?: string;
  className?: string;
}

export const Gallery = ({ ids, title, className }: Props) => {
  return (
    <div className={cn(className)}>
      Gallery {ids && ids.map((item) => item)}
      {title}
    </div>
  );
};
