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

export const PostItemCategory: FC<PostItemProps> = ({
  isFirst = false,
  preview,
  title,
  slug,
  taxonomies,
  excerpt,
  createdAt,
  views,
  commentCount,
  className,
}) => {
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = `/news/${categorySlug}/${slug}`;

  return (
    <div
      className={cn(
        className,
        "flex flex-col w-full mb-6",
        isFirst ? "lg:w-1/3" : "sm:w-1/2 lg:w-1/3"
      )}
    >
      {/* image */}
      <PostImage
        url={preview?.sizes?.medium?.url || preview?.url}
        href={href}
        className={cn("h-[190px]", isFirst && "sm:h-[320px] lg:h-[190px]")}
      />

      {/* category */}
      {categories && (
        <PostCategory
          className="mt-3"
          color="dark"
          parentSlug="news"
          categories={categories}
        />
      )}

      {/* title */}
      {title && (
        <Link href={href}>
          <a className="mt-3 link-primary">
            <h3>{title}</h3>
          </a>
        </Link>
      )}

      {/* text */}
      {excerpt && (
        <p className="mt-3 text-line-clamp-4 text-grey-400">{excerpt}</p>
      )}

      {/* meta */}
      <PostMeta
        className="mt-auto pt-3"
        date={createdAt}
        views={views}
        commentCount={commentCount}
      />
    </div>
  );
};
