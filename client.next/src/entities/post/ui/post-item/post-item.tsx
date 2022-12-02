import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import cn from "clsx";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostCategoryLink } from "@/entities/post/ui/components/post-category-link";
import { getLink } from "@/shared/lib/links";
import { Heading } from "@/shared/ui/heading";

interface Props {
  post: PostProps;
  imageClassName?: string;
  className?: string;
  urlPrefix: string;
}

export const PostItem: FC<Props> = ({
  post,
  imageClassName,
  className,
  urlPrefix,
}) => {
  const {
    preview,
    title,
    slug,
    taxonomies,
    excerpt,
    createdDate,
    meta,
    commentCount,
  } = post;
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = getLink(urlPrefix, categorySlug, slug);
  const views = meta?.views || null;

  return (
    <div className={cn(className, "flex flex-col w-full mb-6")}>
      {/* image */}
      <div className={cn("h-[190px]", imageClassName)}>
        <ImagePreview url={preview?.url} href={href} />
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
      {title && <Heading title={title} href={href} tag="h3" className="mt-3" />}

      {/* text */}
      {excerpt && (
        <p className="mt-3 text-line-clamp-4 text-grey-400">{excerpt}</p>
      )}

      {/* meta */}
      <PostMeta
        className="mt-auto pt-3"
        date={createdDate}
        views={views}
        commentCount={commentCount}
      />
    </div>
  );
};
