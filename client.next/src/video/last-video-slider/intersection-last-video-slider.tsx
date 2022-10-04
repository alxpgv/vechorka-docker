import React, { useRef } from "react";
import { useIntersectionObserver } from "@/utils/hooks/useIntersectionObserver";
import { DynamicLastVideoSlider } from "@/video/last-video-slider/index";

export const IntersectionLastVideoSlider = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  console.log("isVisible");
  console.log(isVisible);

  return <div ref={ref}>{isVisible ? <DynamicLastVideoSlider /> : null}</div>;
};
