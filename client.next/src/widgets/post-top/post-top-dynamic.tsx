import React from "react";
import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import type { PostTopProps } from "@/widgets/post-top";

export const PostTopDynamic = dynamic<PostTopProps>(
  (): any => import("@/widgets/post-top/index").then((mod) => mod.PostTop),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
