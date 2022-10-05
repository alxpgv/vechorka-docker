import React, { FC } from "react";
import { PaperLinksWidget } from "@/newspaper/paper-links-widget";
import { LastReviewsWidget } from "@/reviews/last-reviews-widget";
import { TopNewsWidget } from "@/news/top-news-widget";
import { LayoutColumn } from "@/shared/ui/layouts/layout-column";
import { NavCategories } from "@/shared/ui/navigation/nav-categories";

interface NewsLayoutProps {
  left: React.ReactNode;
}

export const NewsLayout: FC<NewsLayoutProps> = ({ left }) => {
  return (
    <LayoutColumn
      left={left}
      right={
        <>
          <div className="hidden md:block">
            <NavCategories />
          </div>

          <div className="smx1:flex md:block mt-6 lg:mt-12">
            <TopNewsWidget className="smx1:mr-3 md:mr-0" />
            <LastReviewsWidget className="mt-6 smx1:mt-0 md:mt-12" />
          </div>
          <PaperLinksWidget />
        </>
      }
    />
  );
};
