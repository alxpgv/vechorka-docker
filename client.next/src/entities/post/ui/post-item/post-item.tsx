import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import Link from "next/link";
import cn from "clsx";
import { PostMeta } from "@/features/post/post-meta";
import { PostImage } from "@/features/post/post-image";
import { PostCategoryLink } from "@/features/post/post-category-link";
import { getLink } from "@/shared/lib/links";
import { PostTitle } from "@/features/post/post-title";

interface Props {
  post: PostProps;
  isFirst?: boolean;
  className?: string;
  urlPrefix: string;
}

export const PostItem: FC<Props> = ({
  post,
  isFirst = false,
  className,
  urlPrefix,
}) => {
  const {
    preview,
    title,
    slug,
    taxonomies,
    excerpt,
    createdAt,
    views,
    commentCount,
  } = post;
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = getLink(urlPrefix, categorySlug, slug);

  return (
    <div
      className={cn(
        className,
        "flex flex-col w-full mb-6",
        isFirst ? "lg:w-1/3" : "sm:w-1/2 lg:w-1/3"
      )}
    >
      {/* image */}
      <div className={cn("h-[190px]", isFirst && "sm:h-[320px] lg:h-[190px]")}>
        <PostImage url={preview?.url} href={href} />
      </div>

      {/* category */}
      {categories && (
        <PostCategoryLink
          className="mt-3"
          urlPrefix={urlPrefix}
          categories={categories}
        />
      )}

      {/* title */}
      {title && (
        <PostTitle title={title} href={href} tag="h3" className="mt-3" />
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
