import React, { FC } from "react";
import Link from "next/link";
import cn from "clsx";
import NextImage from "next/image";
import type { ImageProps } from "@/shared/types";
import { settings } from "@/shared/config";

interface PostImageProps extends ImageProps {
  href?: string;
  className?: string;
  overlay?: boolean;
  hoverEffect?: boolean;
  children?: React.ReactNode;
  screenSizes?: string;
}

const Image: FC<PostImageProps> = ({ url, alt = "", className, screenSizes }) =>
  url ? (
    <NextImage
      className={cn(className, "pointer-events-auto")}
      src={url}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition="top"
      sizes={screenSizes}
      // sizes="(max-width: 460px) 46vw, (max-width: 768px) 76vw, (max-width: 1024px) 104vw, (max-width: 1200px) 120vw, 100vw"
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
  screenSizes,
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
        <Link href={href} prefetch={false}>
          <a
            className={cn(
              "relative block w-full h-full",
              hoverEffect &&
                "group-hover:scale-110 transition-transform duration-300"
            )}
          >
            <Image
              url={`${settings.uploadUrl}/${url}`}
              alt={alt}
              screenSizes={screenSizes}
            />
          </a>
        </Link>
      )}
      {!href && url && (
        <Image
          url={`${settings.uploadUrl}/${url}`}
          alt={alt}
          screenSizes={screenSizes}
        />
      )}
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
