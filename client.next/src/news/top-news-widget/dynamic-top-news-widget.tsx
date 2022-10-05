import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";
import { TopNewsWidgetProps } from "@/news/top-news-widget/top-news-widget";

export const DynamicTopNewsWidget = dynamic<TopNewsWidgetProps>(
  (): any => import("@/news/top-news-widget").then((mod) => mod.TopNewsWidget),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
