import React, { useCallback, useState } from "react";
import { NewsTabs } from "@/news/components/news-tabs";
import { NewsItem } from "@/news/main-news/news-item";
import { FullLoader } from "@/components/ui/loaders";
import type { PostProps, ListPostProps } from "@/types";
import type { TaxonomyProps } from "@/types";
import { PostItemLarge } from "@/components/posts/post-item-large";
import { getPostsByTaxonomy } from "@/services/api/posts";

interface MainNewsProps {
  initNews: ListPostProps;
  tabs: TaxonomyProps[];
  defaultActiveSlug: string;
}

export const MainNews = ({
  initNews,
  tabs,
  defaultActiveSlug,
}: MainNewsProps) => {
  const [news, setNews] = useState<ListPostProps>(initNews || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps | undefined>(
    tabs.find((tab) => tab.slug === defaultActiveSlug) ?? undefined
  );
  const [loading, setLoading] = useState(false);

  const activeNews: PostProps[] =
    news && activeTab && news[activeTab.slug] ? news[activeTab.slug] : [];

  const taxonomies = activeTab && { categories: [activeTab], tags: [] };

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!news[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const fetchedNews = await getPostsByTaxonomy(tab.taxonomyId, {
            limit: 5,
            sticky: true,
          });
          setNews((prev) => ({ ...prev, [tab.slug]: fetchedNews }));
        } catch (e) {
          console.log("error: main news");
        }
        setLoading(false);
      }
      setActiveTab(tab);
    },
    [news]
  );

  return (
    <>
      {/* tabs */}
      <NewsTabs
        tabs={tabs}
        active={activeTab}
        onChange={(tab) => changeActiveTab(tab)}
      />

      {/* news */}
      {activeNews.length > 0 ? (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading && <FullLoader />}
          {activeNews.map((item, index) => {
            // first item
            if (index === 0) {
              return (
                <div
                  key={item.id}
                  className="col-start-auto col-end-auto sm:col-start-1 sm:col-end-3"
                >
                  <PostItemLarge {...item} taxonomies={taxonomies} />
                </div>
              );
            }

            // two item
            if (index === 1) {
              return (
                <div key={item.id}>
                  <NewsItem {...item} taxonomies={taxonomies} />
                </div>
              );
            }

            // other items
            return (
              <div key={item.id} className="h-auto sm:h-[190px] lg:h-[260px]">
                <NewsItem {...item} taxonomies={taxonomies} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Новости не найдены</div>
      )}
    </>
  );
};
