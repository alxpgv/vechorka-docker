import dynamic from "next/dynamic";
import type { AdvertProps } from "@/shared/ui/advert";

export const DynamicAdvert = dynamic<AdvertProps>(
  (): any => import("@/shared/ui/advert").then((mod) => mod.Advert),
  {
    ssr: false,
    // loading: () => <SimpleLoader />,
  }
);
