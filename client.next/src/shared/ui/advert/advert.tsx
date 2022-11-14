import React from "react";
import { getSizesFromResolution } from "@/shared/lib/helpers";
import Image from "next/image";
import cn from "clsx";

export interface AdvertProps {
  type: string; // "html" | "image"
  size?: "1000x120" | "300x600" | "300x300";
  imageUrl?: string;
  href?: string;
  htmlCode?: string;
  className?: string;
}

export const Advert = ({
  size,
  type,
  imageUrl,
  href,
  htmlCode,
  className,
}: AdvertProps) => {
  // html
  if (type === "html" && htmlCode) {
    return (
      <div
        className={cn("relative mx-auto", className)}
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      />
    );
  }

  // image
  if (type === "image" && imageUrl && size) {
    const sizes = getSizesFromResolution(size);

    const AdvertImage = () => (
      <img src={imageUrl} width={sizes[0]} height={sizes[1]} alt="advert" />
    );

    return (
      <div
        className={cn("relative mx-auto", className)}
        style={{ maxWidth: `${sizes[0]}px`, maxHeight: `${sizes[1]}px` }}
      >
        {href ? (
          <a
            className="block w-full h-full"
            href={href}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            <AdvertImage />
          </a>
        ) : (
          <AdvertImage />
        )}
      </div>
    );
  }

  return null;
};
