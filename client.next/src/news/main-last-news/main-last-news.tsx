import React, { FC, useCallback, useState } from "react";
import { NewsTabs } from "@/news/components/news-tabs";
import { FullLoader } from "@/shared/ui/loaders";
import { Button } from "@/shared/ui/button";
import type { ListPostProps, PostProps } from "@/shared/types";
import type { TaxonomyProps } from "@/shared/types";
import router from "next/router";
import { PostItemCategory } from "@/posts/post-item-category";
import { getPosts, getPostsByTaxonomy } from "@/shared/api/posts";

interface MainLastNewsProps {
  initNews: ListPostProps;
  tabs: TaxonomyProps[];
  limit?: number;
  limitMore?: number;
}

const ButtonCategoryNews = ({ taxonomySlug }: { taxonomySlug: string }) => {
  const href =
    taxonomySlug === "news" ? `/${taxonomySlug}` : `/news/${taxonomySlug}`;

  return (
    <Button variant="outline" onClick={() => router.push(href)}>
      Смотреть все
    </Button>
  );
};

export const MainLastNews: FC<MainLastNewsProps> = ({
  initNews,
  tabs,
  limit = 9,
  limitMore = 3,
}) => {
  const [news, setNews] = useState<ListPostProps>(initNews || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps>(tabs[0] || {});
  const [loading, setLoading] = useState(false);

  const activeNews: PostProps[] =
    news && activeTab && news[activeTab.slug] ? news[activeTab.slug] : [];

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!news[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const fetchedNews = await getPostsByTaxonomy(tab.taxonomyId, {
            limit,
            relations: { taxonomy: true },
          });
          setNews((prev) => ({ ...prev, [tab.slug]: fetchedNews }));
        } catch (e) {
          console.log("error: last news");
        }
        setLoading(false);
      }
      setActiveTab(tab);
    },
    [limit, news]
  );

  const handleShowMore = async () => {
    if (activeTab) {
      setLoading(true);
      const params = {
        offset: activeNews?.length ?? 0,
        limit,
        relations: { taxonomy: true },
      };
      try {
        const fetchedNews = activeTab.taxonomyId
          ? await getPostsByTaxonomy(activeTab.taxonomyId, params)
          : await getPosts(params);
        setNews((prev) => ({
          ...prev,
          [activeTab.slug]: [...prev[activeTab.slug], ...fetchedNews],
        }));
      } catch (e) {
        console.log("error: last news");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* tabs */}
      <NewsTabs
        tabs={tabs}
        active={activeTab}
        onChange={(tab) => changeActiveTab(tab)}
      />

      {/* news */}
      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {activeNews.length > 0 ? (
          activeNews.map((item, index) => {
            const isFirst = index % limit === 0;
            return (
              <PostItemCategory
                key={item.id}
                className="p-2"
                {...item}
                isFirst={isFirst}
                parentSlug="news"
              />
            );
          })
        ) : (
          <div className="p-2">Новости не найдены</div>
        )}
      </div>

      {/* show more button */}
      {activeNews.length > 0 && (
        <div className="mt-3 text-center">
          {/* show button from condition limitMore */}
          {limitMore * limit > activeNews.length &&
          activeNews.length % limit === 0 ? (
            <Button variant="outline" onClick={handleShowMore}>
              Показать еще
            </Button>
          ) : (
            activeTab.slug && (
              <ButtonCategoryNews taxonomySlug={activeTab.slug} />
            )
          )}
        </div>
      )}
    </>
  );
};
