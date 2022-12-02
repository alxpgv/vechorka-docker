import React, { FC } from "react";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { getPostsCommented } from "@/shared/api/posts";
import { Heading } from "@/shared/ui/heading";
import { PostListWidget } from "@/widgets/post-list-widget";

export interface NewsCommentedProps {
  className?: string;
}

export const NewsCommented: FC<NewsCommentedProps> = ({ className }) => {
  return (
    <PostListWidget
      className={className}
      urlPrefix="news"
      title="Комментируют"
      fetchCallback={() => getPostsCommented()}
      view={({ post, href }) => (
        <>
          <div>
            {/* meta */}
            <PostMeta
              className="justify-between"
              date={
                post.comments?.length ? post.comments[0].createdDate : undefined
              }
              time={
                post.comments?.length ? post.comments[0].createdTime : undefined
              }
            />
            {/* title */}
            {post.title && (
              <Heading
                title={post.title}
                href={href}
                tag="h6"
                className="pt-2 text-line-clamp-3"
              />
            )}
          </div>
        </>
      )}
    />
  );
};
