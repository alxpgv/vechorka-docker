import React from "react";
import { PaperLinksWidget } from "@/newspaper/paper-links-widget";
import { DynamicLastReviewsWidget } from "@/reviews/last-reviews-widget";
import { DynamicTopNewsWidget } from "@/news/top-news-widget";
import { DynamicAdsBanner } from "@/ads/ads-banner";
import { LayoutColumn } from "@/components/common/layouts/layout-column";

interface MainLayoutProps {
  left: React.ReactNode;
}

export const MainLayout = ({ left }: MainLayoutProps) => {
  return (
    <LayoutColumn
      left={left}
      right={
        <>
          <div className="smx1:flex md:block">
            <DynamicTopNewsWidget className="smx1:mr-3 md:mr-0" />
            <DynamicAdsBanner
              className="block smx1:hidden mt-6"
              type="280x265"
            />
            <DynamicLastReviewsWidget className="mt-6 smx1:mt-0 md:mt-12" />
            <DynamicAdsBanner
              className="block smx1:hidden mt-6"
              type="280x265"
            />
          </div>

          <PaperLinksWidget />

          <div className="w-full smx1:flex smx1:gap-2 md:block mt-6 md:mt-12">
            <DynamicAdsBanner className="hidden md:block" type="280x600" />
            <DynamicAdsBanner className="md:mt-12" type="280x265" />
            <DynamicAdsBanner
              className="hidden smx1:block md:hidden"
              type="280x265"
            />
            <DynamicAdsBanner
              className="hidden smx1:block md:hidden"
              type="280x265"
            />
            <DynamicAdsBanner
              className="hidden md:block md:mt-12"
              type="280x600"
            />
          </div>
        </>
      }
    />
  );
};
