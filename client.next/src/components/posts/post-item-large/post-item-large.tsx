import React, { FC } from "react";
import type { PostProps } from "@/types";
import Link from "next/link";
import cn from "clsx";
import { PostMeta } from "@/components/posts/post-meta";
import { PostImage } from "@/components/posts/post-image";
import { PostCategory } from "@/components/posts/post-category/post-category";

interface PostItemProps extends PostProps {
  isFirst?: boolean;
  className?: string;
}

export const PostItemLarge: FC<PostItemProps> = ({
  preview,
  title,
  slug,
  excerpt,
  createdAt,
  views,
  taxonomies,
  commentCount,
  className,
}) => {
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = `/news/${categorySlug}/${slug}`;

  return (
    <div className={cn(className, "relative w-full")}>
      {/* image */}
      <PostImage
        url={preview?.url}
        href={href}
        className="h-[260px] sm:h-[320px] lg:h-[460px]"
        overlay
        hoverEffect
      >
        <div className="relative flex flex-col justify-end max-w-[80%] h-full p-5 lg:p-8">
          {/* title */}
          {title && (
            <Link href={href} prefetch={false}>
              <a className="link-light text-line-clamp-4">
                <h2>{title}</h2>
              </a>
            </Link>
          )}

          {/* category */}
          {categories && (
            <PostCategory
              className="mt-3"
              color="light"
              parentSlug="news"
              categories={categories}
              variant="button"
            />
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
    </div>
  );
};
