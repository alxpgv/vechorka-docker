import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprites/icon.svg#${name.toLocaleLowerCase()}`} />
    </svg>
  );
};
