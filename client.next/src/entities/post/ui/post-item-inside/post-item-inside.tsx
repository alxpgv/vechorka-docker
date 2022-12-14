import React, { FC } from "react";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostCategoryLink } from "@/entities/post/ui/components/post-category-link";
import { getLink } from "@/shared/lib/links";
import cn from "clsx";
import { Heading } from "@/shared/ui/heading";
import type { PostProps } from "@/shared/types";
import type { HeadingTagType } from "@/shared/ui/heading/heading";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: HeadingTagType;
  urlPrefix: string;
}

export const PostItemInside: FC<Props> = ({
  post,
  className,
  titleTag,
  urlPrefix,
}) => {
  const { preview, title, slug, createdDate, meta, taxonomies, commentCount } =
    post;
  const views = meta?.views || null;

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
              className="text-line-clamp-3 lg:text-line-clamp-4 pointer-events-auto"
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
            date={createdDate}
            views={views}
            commentCount={commentCount}
            color="light"
          />
        </div>
      </ImagePreview>
    </div>
  );
};
