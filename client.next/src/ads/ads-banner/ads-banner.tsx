import React, { FC } from "react";
import Image from "next/image";
import cn from "clsx";

export interface AdsBannerProps {
  type: "280x600" | "280x265";
  className?: string;
}

const getBannerSrc = (type: string) => {
  switch (type) {
    case "280x265":
      return "/images/ads/ads-280x265-min.png";
    case "280x600":
      return "/images/ads/ads-280x600-min.png";
    default:
      return null;
  }
};

const getSizes = (type: string) => {
  return type.split("x");
};

export const AdsBanner: FC<AdsBannerProps> = ({ type, className }) => {
  const bannerSrc = getBannerSrc(type);
  const sizes = getSizes(type);

  return (
    <div className={cn(className, "relative text-center")}>
      {bannerSrc && (
        <Image
          src={bannerSrc}
          layout="intrinsic"
          width={sizes[0]}
          height={sizes[1]}
          alt=""
        />
      )}
    </div>
  );
};
