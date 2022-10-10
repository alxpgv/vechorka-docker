import React, { FC } from "react";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostCategoryLink } from "@/entities/post/ui/components/post-category-link";
import { getLink } from "@/shared/lib/links";
import cn from "clsx";
import { Heading } from "@/shared/ui/heading";
import type { PostProps } from "@/shared/types";
import type { TagType } from "@/shared/ui/heading/heading";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: TagType;
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
      <ImagePreview url={preview?.url} href={href} overlay hoverEffect>
        <div className="relative flex flex-col justify-end max-w-[80%] h-full p-5 lg:p-8">
          {/* title */}
          {title && (
            <Heading
              title={title}
              href={href}
              color="light"
              tag={titleTag}
              className="text-line-clamp-3 lg:text-line-clamp-4"
            />
          )}

          {/* category */}
          {categories && (
            <PostCategoryLink
              className="mt-3 pointer-events-auto"
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
      </ImagePreview>
    </div>
  );
};