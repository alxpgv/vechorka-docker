import React from "react";
import cn from "clsx";
import { Icon } from "@/shared/ui/icon";

export const IconPlay = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  return (
    <div className="absolute inset-0 group flex items-center justify-center z-10 cursor-pointer">
      <div
        className={cn(
          "flex items-center justify-center group-hover:scale-110 transition-transform border border-white bg-black/70 rounded-full",
          {
            "h-[42px] w-[42px]": size === "sm",
            "h-[60px] w-[60px]": size === "md",
          }
        )}
      >
        <Icon
          name="play"
          className={cn("fill-white", {
            "h-[20px] w-[20px] ml-1": size === "sm",
            "h-[30px] w-[30px] ml-2": size === "md",
          })}
        />
      </div>
    </div>
  );
};
