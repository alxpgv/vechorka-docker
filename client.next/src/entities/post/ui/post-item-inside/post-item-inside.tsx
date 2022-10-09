import React, { FC } from "react";
import { PostMeta } from "@/features/post/post-meta";
import { PostImage } from "@/features/post/post-image";
import { PostLinkCategory } from "@/features/post/post-link-category";
import { getLink } from "@/entities/post/lib";
import cn from "clsx";
import { PostTitle } from "@/features/post/post-title";
import type { PostProps } from "@/shared/types";
import type { HeadingTag } from "@/features/post/post-title/post-title";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: HeadingTag;
  urlPrefix: string;
}

export const PostItemInside: FC<Props> = ({
  post,
  className,
  titleTag,
  urlPrefix,
}) => {
  const { preview, title, slug, createdAt, views, taxonomies, commentCount } =
    post;

  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = getLink(urlPrefix, categorySlug, slug);

  return (
    <div className={cn("relative w-full", className)}>
      {/* image */}
      <PostImage url={preview?.url} href={href} overlay hoverEffect>
        <div className="relative flex flex-col justify-end max-w-[80%] h-full p-5 lg:p-8">
          {/* title */}
          {title && (
            <PostTitle
              title={title}
              href={href}
              color="light"
              tag={titleTag}
              className="text-line-clamp-3 lg:text-line-clamp-4"
            />
          )}

          {/* category */}
          {categories && (
            <PostLinkCategory
              className="mt-3"
              color="light"
              urlPrefix={urlPrefix}
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
