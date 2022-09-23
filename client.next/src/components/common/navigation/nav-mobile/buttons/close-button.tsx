import React, { FC } from "react";
import { Icon } from "@/components/ui/icon";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-[32px] h-[32px] cursor-pointer active:bg-grey-600"
      onClick={onClick}
    >
      <Icon name="close" className="w-[16px] h-[16px] stroke-white" />
    </button>
  );
};
