import React, { FC } from "react";
import cn from "clsx";

interface SpinnerProps {
  size?: "md" | "sm";
}

export const Spinner: FC<SpinnerProps> = ({ size = "sm" }) => {
  return (
    <div
      className={cn("spinner absolute bg-white", {
        "w-[16px] h-[16px]": size === "sm",
      })}
    />
  );
};
