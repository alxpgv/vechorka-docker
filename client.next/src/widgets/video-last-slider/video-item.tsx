import React, { FC } from "react";
import { ImagePreview } from "@/shared/ui/image-preview";
import type { PostProps } from "@/shared/types";

interface Props {
  item: PostProps;
}

export const VideoItem: FC<Props> = ({ item }) => {
  return <ImagePreview url={item.preview?.url} overlay />;
};
