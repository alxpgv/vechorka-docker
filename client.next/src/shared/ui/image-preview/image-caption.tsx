import React from "react";

export const ImageCaption = ({ caption }: { caption: string }) => {
  if (!caption) return null;
  return (
    <div className="absolute bottom-0 w-full p-2 bg-black/50 text-grey-200 text-14px text-right">
      {caption}
    </div>
  );
};
