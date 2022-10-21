import React, { Fragment } from "react";
import type { PostProps } from "@/shared/types";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { Heading } from "@/shared/ui/heading";
import { parseContent } from "@/shared/lib/content";
import { CommentForm } from "@/entities/comment/ui/comment-form";
import { CommentList } from "@/entities/comment/ui/comment-list";

export const PostDetail = ({
  id,
  title,
  content,
  preview,
  commentCount,
  createdAt,
  meta,
  user,
}: PostProps) => {
  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];
  const views = meta?.views || null;

  return (
    <>
      {preview && Object.keys(preview).length > 0 && (
        <div className="h-[260px] sm:h-[320px] lg:h-[460px] mb-5">
          <ImagePreview url={preview?.url} />
        </div>
      )}
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      <PostMeta
        date={createdAt}
        time={createdAt}
        views={views}
        commentCount={commentCount}
      />
      {components &&
        components.map((component, index) => {
          if (typeof component === "string") {
            return (
              <div
                key={index}
                className="content"
                dangerouslySetInnerHTML={{ __html: component }}
              />
            );
          } else if (typeof component === "object") {
            return <Fragment key={index}>{component}</Fragment>;
          }
        })}
      {user && (
        <div className="mt-5 text-grey-500">
          <strong>Автор:</strong> {user}
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-grey-500">Комментарии</h3>
        <div className="mt-5">
          <CommentForm postId={id} />
        </div>
        {Number(commentCount) > 0 && (
          <div className="mt-8">
            <CommentList postId={id} />
          </div>
        )}
      </div>
    </>
  );
};
