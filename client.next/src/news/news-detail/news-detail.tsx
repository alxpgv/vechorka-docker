import React from "react";
import type { PostProps } from "@/types";

interface NewsDetailProps {
  post: PostProps;
}

export const NewsDetail = ({ post }: NewsDetailProps) => {
  // console.log(post);
  // console.log(post.content);
  // console.log(post.content?.replace(/\r\n/g, "<br/>"));
  const content = post.content?.replace(/\r\n/g, "<br/>");
  return (
    <div className="content">
      {post.title && <h1>{post.title}</h1>}
      {content && (
        <div dangerouslySetInnerHTML={{ __html: content }} />
        // <div>{content}</div>
      )}
    </div>
  );
};
