import React, { FC } from "react";

interface Props {
  name: string;
  className?: string;
}

export const Icon: FC<Props> = ({ name, className }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprites/icon.svg#${name.toLocaleLowerCase()}`} />
    </svg>
  );
};
