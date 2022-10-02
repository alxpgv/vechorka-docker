import type { PostProps } from "@/types";
import React, { FC } from "react";
import Link from "next/link";
import { PostMeta } from "@/components/posts/post-meta";
import { PostImage } from "@/components/posts/post-image";

export const NewsItem: FC<PostProps> = ({
  preview,
  title,
  slug,
  excerpt,
  createdAt,
  views,
  taxonomies,
  commentCount,
}) => {
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = `/news/${categorySlug}/${slug}`;

  return (
    <>
      <PostImage
        className="hidden sm:block"
        href={href}
        url={preview?.url}
        overlay
        hoverEffect
      >
        <div className="relative flex flex-col justify-end h-full max-w-[80%] p-5 lg:p-8">
          {/* title */}
          {title && (
            <Link href={href}>
              <a className="link-light text-line-clamp-5">
                <h3>{title}</h3>
              </a>
            </Link>
          )}

          {/* meta */}
          <PostMeta
            className="pt-3"
            date={createdAt}
            views={views}
            commentCount={commentCount}
            color="light"
          />
        </div>
      </PostImage>

      {/* only for mobile - list style */}
      <div className="flex sm:hidden border-b border-grey-400 pb-3">
        {/*<div className="flex-shrink-0 w-[60px] min-h-[70px] mr-3">*/}
        {/*  <PostImage href={href} url={preview?.sizes?.thumbnail?.url} />*/}
        {/*</div>*/}
        <div>
          <Link href={href}>
            <a className="link-primary">
              <h3>{title}</h3>
            </a>
          </Link>

          {/* meta info */}
          <PostMeta
            className="mt-2"
            date={createdAt}
            views={views}
            commentCount={commentCount}
            color="responsive"
          />
        </div>
      </div>
    </>
  );
};
