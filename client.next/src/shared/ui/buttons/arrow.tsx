import React, { FC, MouseEvent } from "react";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";

interface Props {
  disabled?: boolean;
  left?: boolean;
  onClick: (e: MouseEvent) => void;
}

export const Arrow: FC<Props> = ({ left = false, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-[36px] h-[36px] bg-grey-100 group active:bg-blue-300 transition-colors",
        !left && "ml-1"
      )}
      onClick={onClick}
    >
      <Icon
        name="arrow"
        className={cn(
          "w-[16px] h-[16px] stroke-grey-450 group-active:stroke-white",
          left ? "rotate-90" : "-rotate-90"
        )}
      />
    </button>
  );
};
