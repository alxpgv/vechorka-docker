import React from "react";

interface Props {
  ids: number[] | string[];
  className?: string;
  title?: string;
}

export const Gallery = ({ ids, className, title }: Props) => {
  return (
    <div className="bg-blue-300">
      Gallery {ids && ids.map((item) => item)}
      {title}
    </div>
  );
};
