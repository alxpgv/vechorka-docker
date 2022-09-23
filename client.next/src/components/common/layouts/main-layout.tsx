import React, { FC } from "react";
import { PaperLinksWidget } from "@/newspaper/paper-links-widget";
import { LastReviewsWidget } from "@/reviews/last-reviews-widget";
import { TopNewsWidget } from "@/news/top-news-widget";
import { AdsBanner } from "@/ads/ads-banner";
import { LayoutColumn } from "@/components/common/layouts/layout-column";

interface MainLayoutProps {
  left: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ left }) => {
  return (
    <LayoutColumn
      left={left}
      right={
        <>
          <div className="smx1:flex md:block">
            <TopNewsWidget className="smx1:mr-3 md:mr-0" />
            <AdsBanner className="block smx1:hidden mt-6" type="280x265" />
            <LastReviewsWidget className="mt-6 smx1:mt-0 md:mt-12" />
            <AdsBanner className="block smx1:hidden mt-6" type="280x265" />
          </div>

          <PaperLinksWidget />

          <div className="w-full smx1:flex smx1:gap-2 md:block mt-6 md:mt-12">
            <AdsBanner className="hidden md:block" type="280x600" />
            <AdsBanner className="md:mt-12" type="280x265" />
            <AdsBanner className="hidden smx1:block md:hidden" type="280x265" />
            <AdsBanner className="hidden smx1:block md:hidden" type="280x265" />
            <AdsBanner className="hidden md:block md:mt-12" type="280x600" />
          </div>
        </>
      }
    />
  );
};
