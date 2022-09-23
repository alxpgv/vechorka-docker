import React, { FC } from "react";
import { PostImage } from "@/components/posts/post-image";
import { PostProps } from "@/types";

interface VideoItemProps {
  item: PostProps;
}

export const VideoItem: FC<VideoItemProps> = ({ item }) => {
  return <PostImage url={item.preview?.url} overlay />;
};
