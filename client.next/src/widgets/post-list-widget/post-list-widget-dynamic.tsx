import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";
import { PostListWidgetProps } from "@/widgets/post-list-widget";

export const PostListWidgetDynamic = dynamic<PostListWidgetProps>(
  (): any =>
    import("@/widgets/post-list-widget").then((mod) => mod.PostListWidget),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
