import React from "react";
import type { PostProps } from "@/shared/types";
import { PostImage } from "@/shared/ui/post/post-image";
import { PostMeta } from "@/shared/ui/post/post-meta";
import { parseContent } from "@/shared/lib/content";

export const PostDetail = ({
  title,
  content,
  preview,
  commentCount,
  createdAt,
  views,
  user,
}: PostProps) => {
  return (
    <>
      <PostImage
        url={preview?.url}
        className="h-[260px] sm:h-[320px] lg:h-[460px] mb-5"
      />
      {title && <h1 className="text-grey-500 mb-5">{title}</h1>}
      <PostMeta
        date={createdAt}
        time={createdAt}
        views={views}
        commentCount={commentCount}
      />
      {content && (
        <div
          className="content mt-5"
          dangerouslySetInnerHTML={{ __html: parseContent(content) }}
        />
      )}
      {user && (
        <div className="mt-5 text-grey-500">
          <strong>Автор:</strong> {user}
        </div>
      )}
    </>
  );
};
