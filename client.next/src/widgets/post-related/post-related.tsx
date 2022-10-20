import React from "react";
import type { PostProps } from "@/shared/types";
import { PostItem } from "@/entities/post/ui/post-item";
import cn from "clsx";

interface Props {
  posts: PostProps[];
  urlPrefix: string;
  title: string;
}

export const PostRelated = ({ posts, urlPrefix, title }: Props) => {
  if (!posts || !posts.length) return null;

  return (
    <div className="mt-6 md:mt-12">
      {title && <h2 className="mb-7 text-grey-500">{title}</h2>}
      <div className="flex flex-wrap -m-2">
        {posts.map((post) => {
          return (
            <PostItem
              key={post.id}
              post={post}
              className={cn("p-2 sm:w-1/2 md:w-1/4")}
              urlPrefix={urlPrefix}
            />
          );
        })}
      </div>
    </div>
  );
};
