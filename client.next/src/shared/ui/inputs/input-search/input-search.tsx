import React, { FC } from "react";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";

interface InputSearchProps {
  variant?: "primary" | "secondary";
}

export const InputSearch: FC<InputSearchProps> = ({ variant = "primary" }) => {
  const variantClasses =
    variant === "primary"
      ? "border-grey-200 focus:border-blue-300"
      : "border-white bg-grey-450 focus:border-blue-100 text-white";
  return (
    <div className="relative w-full h-full">
      <input
        className={cn(
          "border w-full h-full p-2 pr-8 text-14px",
          variantClasses
        )}
        type="text"
        placeholder="Поиск по сайту..."
      />
      <button className="absolute right-0 bottom-0 w-[30px] h-full flex items-center justify-center">
        <Icon
          name="search"
          className={cn(
            "w-[14px] h-[14px]",
            variant === "primary" ? "stroke-blue-300" : "stroke-white"
          )}
        />
      </button>
    </div>
  );
};
