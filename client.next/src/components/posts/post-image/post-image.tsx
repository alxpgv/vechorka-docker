import React, { FC } from "react";
import Link from "next/link";
import cn from "clsx";
import NextImage from "next/image";
import type { ImageProps } from "@/types";
import { settings } from "@/config";

interface PostImageProps extends ImageProps {
  href?: string;
  className?: string;
  overlay?: boolean;
  hoverEffect?: boolean;
  children?: React.ReactNode;
}

const Image: FC<PostImageProps> = ({ url, alt = "", className }) =>
  url ? (
    <NextImage
      className={cn(className, "pointer-events-auto")}
      src={url}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition="top"
    />
  ) : null;

export const PostImage: FC<PostImageProps> = ({
  url,
  alt,
  href,
  className,
  overlay = false,
  hoverEffect = false,
  children,
}) => {
  if (!url) return null;

  return (
    <div
      className={cn(
        "relative w-full h-full",
        className,
        hoverEffect && "group overflow-hidden"
      )}
    >
      {href && url && (
        <Link href={href}>
          <a
            className={cn(
              "relative block w-full h-full",
              hoverEffect &&
                "group-hover:scale-110 transition-transform duration-300"
            )}
          >
            <Image url={`${settings.uploadUrl}/${url}`} alt={alt} />
          </a>
        </Link>
      )}
      {!href && url && <Image url={`${settings.uploadUrl}/${url}`} alt={alt} />}
      {overlay ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t to-black/30 from-black/70 group-hover:opacity-50 transition pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
};
