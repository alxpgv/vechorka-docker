import React, { FC, useCallback, useState } from "react";
import { ScrollTabs } from "@/shared/ui/scroll-tabs";
import { FullLoader } from "@/shared/ui/loaders";
import { Button } from "@/shared/ui/button";
import type { ListPostProps, PostProps } from "@/shared/types";
import type { TaxonomyProps } from "@/shared/types";
import router from "next/router";
import { PostItem } from "@/entities/post/ui/post-item";
import { getPosts, getPostsByTaxonomy } from "@/shared/api/posts";
import { messages } from "@/shared/constants";
import { getLink } from "@/entities/post/lib";

interface Props {
  initPosts: ListPostProps;
  tabs: TaxonomyProps[];
  limit?: number;
  limitMore?: number;
  urlPrefix: string;
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

export const PostCategoriesTabbed: FC<Props> = ({
  initPosts,
  tabs,
  limit = 9,
  limitMore = 3,
  urlPrefix,
}) => {
  const [posts, setPosts] = useState<ListPostProps>(initPosts || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps>(tabs[0] || {});
  const [loading, setLoading] = useState(false);

  const activePosts: PostProps[] =
    posts && activeTab && posts[activeTab.slug] ? posts[activeTab.slug] : [];

  console.log(posts);

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!posts[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const fetchedPosts = await getPostsByTaxonomy(tab.taxonomyId, {
            limit,
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
        offset: activePosts?.length ?? 0,
        limit,
        relations: { taxonomy: true },
      };
      try {
        const fetchedNews = activeTab.taxonomyId
          ? await getPostsByTaxonomy(activeTab.taxonomyId, params)
          : await getPosts(params);
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
                className="p-2"
                isFirst={isFirst}
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
