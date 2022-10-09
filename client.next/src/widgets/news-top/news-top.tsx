import React, { FC } from "react";
import { PostMeta } from "@/features/post/post-meta";
import { PostImage } from "@/features/post/post-image";
import { getPosts } from "@/shared/api/posts";
import { PostTitle } from "@/features/post/post-title";
import { PostListWidget } from "@/widgets/post-list-widget";

export interface NewsTopProps {
  className?: string;
}

export const NewsTop: FC<NewsTopProps> = ({ className }) => {
  return (
    <PostListWidget
      className={className}
      urlPrefix="news"
      title="Популярные"
      fetchCallback={() =>
        getPosts({
          limit: 5,
          relations: { taxonomy: true },
        })
      }
      view={({ post, href }) => (
        <>
          {/* image */}
          <div className="relative w-[60px] min-h-[70px]">
            <PostImage
              url={post.preview?.sizes?.thumbnail?.url || post.preview?.url}
              href={href}
            />
          </div>
          {/* content */}
          <div className="flex-1 pl-3">
            {/* meta */}
            <PostMeta
              className="justify-between"
              date={post.createdAt}
              commentCount={post.commentCount}
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
