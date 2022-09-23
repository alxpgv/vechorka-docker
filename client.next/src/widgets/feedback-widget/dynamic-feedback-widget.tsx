import dynamic from "next/dynamic";
import { SimpleLoader } from "@/components/ui/loaders";
import React from "react";

export const DynamicFeedbackWidget = dynamic(
  (): any =>
    import("@/widgets/feedback-widget/index").then((mod) => mod.FeedbackWidget),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
