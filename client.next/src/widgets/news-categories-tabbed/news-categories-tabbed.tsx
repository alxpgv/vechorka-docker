import React, { FC, useCallback, useState } from "react";
import { ScrollTabs } from "@/shared/ui/scroll-tabs";
import { FullLoader } from "@/shared/ui/loaders";
import { Button } from "@/shared/ui/buttons";
import type { ListPostProps, PostProps } from "@/shared/types";
import type { TaxonomyProps } from "@/shared/types";
import router from "next/router";
import { PostItem } from "@/entities/post/ui/post-item";
import { getPosts } from "@/shared/api/posts";
import { messages } from "@/shared/constants";
import { getLink } from "@/shared/lib/links";
import cn from "clsx";
import { Advert } from "@/shared/ui/advert";
import { useSettings } from "@/app/contexts/settings-context";

interface Props {
  initPosts: ListPostProps;
  tabs: TaxonomyProps[];
  limit?: number;
  limitMore?: number;
  urlPrefix: string;
  excludeIds?: string;
  excludeInSlug?: string;
}

const LinkToCategory = ({
  categorySlug,
  urlPrefix,
}: {
  categorySlug?: string;
  urlPrefix: string;
}) => {
  const href = getLink(urlPrefix, categorySlug);

  return (
    <Button variant="outline" onClick={() => router.push(href)}>
      Смотреть все
    </Button>
  );
};

export const NewsCategoriesTabbed: FC<Props> = ({
  initPosts,
  tabs,
  limit = 9,
  limitMore = 3,
  urlPrefix,
  excludeIds,
  excludeInSlug,
}) => {
  const [posts, setPosts] = useState<ListPostProps>(initPosts || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps>(tabs[0] || {});
  const [loading, setLoading] = useState(false);
  const { advert } = useSettings();
  console.log(advert);

  const activePosts: PostProps[] =
    activeTab && posts[activeTab.slug] ? posts[activeTab.slug] : [];

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!posts[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const fetchedPosts = await getPosts({
            taxonomyId: tab.taxonomyId,
            limit,
            excludeIds:
              excludeIds && excludeInSlug && tab.slug === excludeInSlug
                ? excludeIds
                : undefined,
            relations: { taxonomy: true },
          });
          setPosts((prev) => ({ ...prev, [tab.slug]: fetchedPosts }));
        } catch (e) {
          console.log("error: last posts");
        }
        setLoading(false);
      }
      setActiveTab(tab);
    },
    [limit, posts]
  );

  const handleShowMore = async () => {
    if (activeTab) {
      setLoading(true);
      const params = {
        taxonomyId: activeTab.taxonomyId,
        offset: activePosts?.length ?? 0,
        limit,
        excludeIds:
          excludeIds && excludeInSlug && activeTab.slug === excludeInSlug
            ? excludeIds
            : undefined,
        relations: { taxonomy: true },
      };
      try {
        const fetchedNews = await getPosts(params);
        setPosts((prev) => ({
          ...prev,
          [activeTab.slug]: [...prev[activeTab.slug], ...fetchedNews],
        }));
      } catch (e) {
        console.log("error: last posts");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* tabs */}
      <ScrollTabs
        tabs={tabs}
        active={activeTab}
        onChange={(tab) => changeActiveTab(tab)}
      />

      {/* advert */}
      {advert && !!Number(advert.advert_block_1_visible) && (
        <Advert
          className="mb-5"
          type={advert.advert_block_1_type}
          size="1000x120"
          imageUrl={advert.advert_block_1_image_url}
          href={advert.advert_block_1_href}
          htmlCode={advert.advert_block_1_html_code}
        />
      )}

      {/* posts */}
      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {activePosts.length > 0 ? (
          activePosts.map((post, index) => {
            const isFirst = index % limit === 0;
            return (
              <PostItem
                key={post.id}
                post={post}
                className={cn(
                  "p-2",
                  isFirst ? "lg:w-1/3" : "sm:w-1/2 lg:w-1/3"
                )}
                imageClassName={isFirst ? "sm:h-[320px] lg:h-[190px]" : ""}
                urlPrefix={urlPrefix}
              />
            );
          })
        ) : (
          <div className="p-2">{messages.post.notFound}</div>
        )}
      </div>

      {/* show more button */}
      {activePosts.length > 0 && (
        <div className="mt-3 text-center">
          {/* show button from condition limitMore */}
          {limitMore * limit > activePosts.length &&
          activePosts.length % limit === 0 ? (
            <Button variant="outline" onClick={handleShowMore}>
              Показать еще
            </Button>
          ) : (
            activeTab.slug && (
              <LinkToCategory
                categorySlug={
                  activeTab.slug === urlPrefix ? undefined : activeTab.slug
                }
                urlPrefix={urlPrefix}
              />
            )
          )}
        </div>
      )}
    </>
  );
};
