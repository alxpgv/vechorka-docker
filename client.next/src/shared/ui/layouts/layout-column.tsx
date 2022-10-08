import React, { FC } from "react";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const LayoutColumn: FC<Props> = ({ left, right }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap mt-8">
      {/* left column */}
      <div className="w-full md:flex-1 md:mr-6 lg:mr-12 overflow-hidden">
        {left}
      </div>

      {/* right column */}
      <div className="w-full md:w-[280px]">{right}</div>
    </div>
  );
};
