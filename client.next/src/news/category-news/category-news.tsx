import React, { FC, useEffect, useState } from "react";
import type { PostProps } from "@/shared/types";
import { FullLoader } from "@/shared/ui/loaders";
import { useRouter } from "next/router";
import { Button } from "@/shared/ui/button";
import { PostItemCategory } from "@/shared/ui/post/post-item-category";
import { getPostsByTaxonomySlug } from "@/shared/api/posts";
import { PostItemInside } from "@/entities/post/ui/post-item-inside";

interface CategoryNewsProps {
  initNews: PostProps[];
  limit?: number;
}

export const CategoryNews: FC<CategoryNewsProps> = ({
  initNews,
  limit = 13,
}) => {
  const [news, setNews] = useState<PostProps[]>(initNews || []);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const categorySlug = router.query.category ?? "news";

  useEffect(() => {
    setNews(initNews);
  }, [initNews]);

  const handleShowMore = async () => {
    const offset = news.length;
    setLoading(true);
    try {
      const fetchedNews = await getPostsByTaxonomySlug(categorySlug as string, {
        limit,
        offset,
        relations: { taxonomy: true },
      });
      fetchedNews?.length && setNews((prev) => [...prev, ...fetchedNews]);
    } catch (e) {
      console.log("error");
    }
    setLoading(false);
  };

  return (
    <>
      {/* news */}
      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {!Boolean(news.length) && <div className="p-2">Новости не найдены</div>}
        {news.map((item, index) => {
          const isFirst = index % limit === 0;
          return isFirst ? (
            <PostItemInside
              key={item.id}
              post={item}
              titleTag="h2"
              className="h-[260px] sm:h-[320px] lg:h-[460px] m-2 mb-6"
            />
          ) : (
            <PostItemCategory
              key={item.id}
              className="p-2"
              {...item}
              parentSlug="news"
            />
          );
        })}
      </div>

      {/*
      show more button, news.length % limit - condition for detect last news,
      if not a full array, then last news
      */}
      {news?.length > 0 && news.length % limit === 0 && (
        <div className="mt-3 text-center">
          <Button variant="outline" onClick={handleShowMore}>
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
};
