import React, { FC } from "react";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, className }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprites/icon.svg#${name.toLocaleLowerCase()}`} />
    </svg>
  );
};
