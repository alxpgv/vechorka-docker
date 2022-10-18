import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";

export const FeedbackSocialsDynamic = dynamic(
  (): any =>
    import("@/widgets/_feedback-socials").then((mod) => mod.FeedbackSocials),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
