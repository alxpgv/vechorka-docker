import React, { FC } from "react";
import cn from "clsx";

interface HamburgerProps {
  handleClick: () => void;
}

export const Hamburger: FC<HamburgerProps> = ({ handleClick }) => {
  const lineClasses = "block h-1 mb-0.5 w-[28px] border-b-2 border-blue-300";
  return (
    <button
      className="flex flex-col items-center justify-center
      w-[40px] h-[40px] ml-2 cursor-pointer active:bg-grey-100"
      onClick={handleClick}
    >
      <span className={lineClasses} />
      <span className={lineClasses} />
      <span className={cn(lineClasses, "mb-0")} />
    </button>
  );
};
