import dynamic from "next/dynamic";
import { SimpleLoader } from "@/shared/ui/loaders";
import React from "react";

export const DynamicLastVideoSlider = dynamic(
  (): any =>
    import("@/video/last-video-slider").then((mod) => mod.LastVideoSlider),
  {
    ssr: false,
    loading: () => <SimpleLoader />,
  }
);
