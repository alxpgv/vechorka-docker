import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import { PostMeta } from "@/shared/ui/post/post-meta";
import { getLink } from "@/entities/post/lib";
import cn from "clsx";
import type { HeadingTag } from "@/shared/ui/post/post-title/post-title";
import { PostTitle } from "@/shared/ui/post/post-title/post-title";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: HeadingTag;
}

export const PostItemSimple: FC<Props> = ({ post, className, titleTag }) => {
  const { title, slug, createdAt, views, taxonomies, commentCount } = post;
  const categories = taxonomies?.categories;
  const categorySlug = categories && categories[0] ? categories[0].slug : "";
  const href = getLink(slug, categorySlug, "news");

  return (
    <div className={cn("flex", className)}>
      {/*<div className="flex-shrink-0 w-[60px] min-h-[70px] mr-3">*/}
      {/*  <PostImage href={href} url={preview?.sizes?.thumbnail?.url} />*/}
      {/*</div>*/}
      <div>
        {/* title */}
        {title && <PostTitle title={title} href={href} tag={titleTag} />}

        {/* meta info */}
        <PostMeta
          className="mt-2"
          date={createdAt}
          views={views}
          commentCount={commentCount}
        />
      </div>
    </div>
  );
};
