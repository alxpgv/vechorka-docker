import dynamic from "next/dynamic";
import { SimpleLoader } from "@/components/ui/loaders";
import React from "react";
import { LastReviewsWidgetProps } from "@/reviews/last-reviews-widget/last-reviews-widget";

export const DynamicLastReviewsWidget = dynamic<LastReviewsWidgetProps>(
  (): any =>
    import("@/reviews/last-reviews-widget").then(
      (mod) => mod.LastReviewsWidget
    ),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
