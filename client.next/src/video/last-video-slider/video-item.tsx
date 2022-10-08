import React, { FC } from "react";
import { PostImage } from "@/shared/ui/post/post-image";
import { PostProps } from "@/shared/types";

interface VideoItemProps {
  item: PostProps;
}

export const VideoItem: FC<VideoItemProps> = ({ item }) => {
  return <PostImage url={item.preview?.url} overlay />;
};
