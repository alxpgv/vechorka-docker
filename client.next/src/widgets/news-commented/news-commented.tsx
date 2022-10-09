import React, { FC } from "react";
import { PostMeta } from "@/features/post/post-meta";
import { getPosts } from "@/shared/api/posts";
import { PostTitle } from "@/features/post/post-title";
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
      fetchCallback={() =>
        getPosts({
          limit: 5,
          relations: { taxonomy: true },
        })
      }
      view={({ post, href }) => (
        <>
          <div>
            {/* meta */}
            <PostMeta
              className="justify-between"
              date={post.createdAt}
              time={post.createdAt}
            />
            {/* title */}
            {post.title && (
              <PostTitle
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
