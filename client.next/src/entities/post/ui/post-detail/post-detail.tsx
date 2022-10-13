import React from "react";
import type { PostProps } from "@/shared/types";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { Heading } from "@/shared/ui/heading";
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
  const components: Array<string | React.ReactNode> = content
    ? parseContent(content)
    : [];

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
      <div className="content">
        {components &&
          components.map((component) => {
            if (typeof component === "string") {
              return <div dangerouslySetInnerHTML={{ __html: component }} />;
            } else if (typeof component === "object") {
              return component;
            }
          })}
      </div>
      {user && (
        <div className="mt-5 text-grey-500">
          <strong>Автор:</strong> {user}
        </div>
      )}
    </>
  );
};
