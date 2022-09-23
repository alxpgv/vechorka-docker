import React from "react";
import type { PostProps } from "@/types";

interface NewsDetailProps {
  post: PostProps;
}

export const NewsDetail = ({ post }: NewsDetailProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};
