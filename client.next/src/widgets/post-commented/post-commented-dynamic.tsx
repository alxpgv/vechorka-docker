import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";
import { PostCommentedProps } from "@/widgets/post-commented";

export const PostCommentedDynamic = dynamic<PostCommentedProps>(
  (): any =>
    import("@/widgets/post-commented/index").then((mod) => mod.PostCommented),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
