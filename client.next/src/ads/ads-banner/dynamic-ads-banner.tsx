import dynamic from "next/dynamic";
import { AdsBannerProps } from "@/ads/ads-banner/ads-banner";

export const DynamicAdsBanner = dynamic<AdsBannerProps>(
  (): any => import("@/ads/ads-banner").then((mod) => mod.AdsBanner),
  {
    ssr: false,
    // loading: () => <SimpleLoader />,
  }
);
