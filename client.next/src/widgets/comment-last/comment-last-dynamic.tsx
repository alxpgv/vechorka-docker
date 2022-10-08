import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";
import { CommentLastProps } from "@/widgets/comment-last/comment-last";

export const CommentLastDynamic = dynamic<CommentLastProps>(
  (): any =>
    import("@/widgets/comment-last/index").then((mod) => mod.CommentLast),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
