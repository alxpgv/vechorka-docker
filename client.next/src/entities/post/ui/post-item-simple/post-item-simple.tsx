import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { getLink } from "@/shared/lib/links";
import cn from "clsx";
import type { HeadingTagType } from "@/shared/ui/heading";
import { Heading } from "@/shared/ui/heading";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: HeadingTagType;
  urlPrefix: string;
}

export const PostItemSimple: FC<Props> = ({
  post,
  className,
  titleTag,
  urlPrefix,
}) => {
  const { title, slug, createdDate, meta, taxonomies, commentCount } = post;
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = getLink(urlPrefix, categorySlug, slug);
  const views = meta?.views || null;

  return (
    <div className={cn("flex", className)}>
      {/*<div className="flex-shrink-0 w-[60px] min-h-[70px] mr-3">*/}
      {/*  <ImagePreview href={href} url={preview?.sizes?.thumbnail?.url} />*/}
      {/*</div>*/}
      <div>
        {/* title */}
        {title && <Heading title={title} href={href} tag={titleTag} />}

        {/* meta info */}
        <PostMeta
          className="mt-2"
          date={createdDate}
          views={views}
          commentCount={commentCount}
        />
      </div>
    </div>
  );
};
