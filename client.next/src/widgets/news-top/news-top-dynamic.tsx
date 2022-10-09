import React from "react";
import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import type { NewsTopProps } from "@/widgets/news-top";

export const NewsTopDynamic = dynamic<NewsTopProps>(
  (): any => import("@/widgets/news-top").then((mod) => mod.NewsTop),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
