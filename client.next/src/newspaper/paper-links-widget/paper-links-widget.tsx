import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/shared/ui/icon";

interface PaperLinksWidgetProps {
  className?: string;
}

export const PaperLinksWidget: FC<PaperLinksWidgetProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="relative mt-[60px] py-10 px-6 bg-blue-200 text-white">
        {/* image */}
        <div className="absolute -top-[60px] right-0 h-[150px] w-[185px]">
          <Image
            src="/images/icon-newspaper-min.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>

        {/* title */}
        <h4 className="pb-4 text-white">Газета</h4>

        {/* links */}
        <div className="relative space-y-3">
          <div className="flex items-center text-14px">
            <Link href="/">
              <a className="flex items-center justify-end link-light group">
                <Icon
                  name="arrow"
                  className="h-[8px] w-[10px] mr-1.5 -rotate-90 stroke-white group-hover:stroke-grey-100"
                />
                <span>Свежий номер</span>
              </a>
            </Link>
          </div>

          <div className="flex items-center text-14px">
            <Link href="/">
              <a className="flex items-center justify-end link-light group">
                <Icon
                  name="arrow"
                  className="h-[8px] w-[10px] mr-1.5 -rotate-90 stroke-white group-hover:stroke-grey-100"
                />
                <span>Архив номеров</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
