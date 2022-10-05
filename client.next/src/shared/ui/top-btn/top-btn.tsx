import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@/shared/ui/icon";

export const TopBtn = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    window.scrollY > 1200 ? setVisible(true) : setVisible(false);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return visible ? (
    <div
      className="w-[32px] h-[32px] fixed flex items-center justify-center bottom-3 right-3 bg-blue-100/80 hover:bg-blue-300/80 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <Icon
        name={"arrow"}
        className="w-[18px] h-[18px] rotate-180 stroke-white"
      />
    </div>
  ) : null;
};
