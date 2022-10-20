import React from "react";
import { NewsPaperPost } from "@/shared/types";
import Image from "next/image";
import { Heading } from "@/shared/ui/heading";

export const LastRelease = ({ item }: { item: NewsPaperPost }) => {
  return (
    <div className="flex flex-col md:flex-row items-center text-center md:text-left bg-grey-100 p-5 md:px-12 md:py-10">
      <Image src="/images/pdf-min.png" width={200} height={200} alt={"pdf"} />
      <div className="max-w-[80%]">
        {item.title && <Heading tag="h1" title={item.title} />}
        {item.attached && (
          <a
            href={item.attached}
            target="_blank"
            rel="noopener"
            className="block mt-5 font-bold"
          >
            Скачать / смотреть в формате PDF
          </a>
        )}
      </div>
    </div>
  );
};
