import React, { FC } from "react";
import cn from "clsx";

interface Props {
  color?: "light" | "dark";
}

export const FullLoader: FC<Props> = ({ color = "light" }) => {
  return (
    <div
      className={cn(
        "absolute flex items-center justify-center p-6 inset-0 z-10",
        {
          "backdrop-blur bg-white/50 text-black": color === "light",
          "backdrop-blur bg-black/50 text-white": color === "dark",
        }
      )}
    >
      Загрузка
    </div>
  );
};
