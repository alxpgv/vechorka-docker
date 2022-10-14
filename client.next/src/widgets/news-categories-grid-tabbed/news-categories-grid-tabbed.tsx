import React, { FC, useCallback, useState } from "react";
import { ScrollTabs } from "@/shared/ui/scroll-tabs";
import { FullLoader } from "@/shared/ui/loaders";
import type { PostProps, ListPostProps } from "@/shared/types";
import type { TaxonomyProps } from "@/shared/types";
import { getPosts } from "@/shared/api/posts";
import { PostItemInside } from "@/entities/post/ui/post-item-inside";
import { PostItemSimple } from "@/entities/post/ui/post-item-simple";
import { messages } from "@/shared/constants";

interface Props {
  initPosts: ListPostProps;
  tabs: TaxonomyProps[];
  defaultActiveSlug: string;
  urlPrefix: string;
}

export const NewsCategoriesGridTabbed: FC<Props> = ({
  initPosts,
  tabs,
  defaultActiveSlug,
  urlPrefix,
}) => {
  const [posts, setPosts] = useState<ListPostProps>(initPosts || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps | undefined>(
    tabs.find((tab) => tab.slug === defaultActiveSlug) ?? undefined
  );
  const [loading, setLoading] = useState(false);

  const activePosts: PostProps[] =
    activeTab && posts[activeTab.slug] ? posts[activeTab.slug] : [];

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!posts[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const fetchedPosts = await getPosts({
            taxonomyId: tab.taxonomyId,
            limit: 5,
            sticky: true,
            relations: { taxonomy: true },
          });
          setPosts((prev) => ({ ...prev, [tab.slug]: fetchedPosts }));
        } catch (e) {
          console.log("error: main posts");
        }
        setLoading(false);
      }
      setActiveTab(tab);
    },
    [posts]
  );

  return (
    <>
      {/* tabs */}
      <ScrollTabs
        tabs={tabs}
        active={activeTab}
        onChange={(tab) => changeActiveTab(tab)}
      />

      {/* news */}
      {activePosts.length > 0 ? (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading && <FullLoader />}
          {activePosts.map((post, index) => {
            // first item
            if (index === 0) {
              return (
                <div
                  key={post.id}
                  className="col-start-auto col-end-auto sm:col-start-1 sm:col-end-3"
                >
                  <PostItemInside
                    post={post}
                    titleTag="h2"
                    className="h-[260px] sm:h-[320px] lg:h-[460px]"
                    urlPrefix={urlPrefix}
                  />
                </div>
              );
            }

            return (
              <div
                key={post.id}
                // only for two and other items
                className={index > 1 ? "h-auto sm:h-[190px] lg:h-[260px]" : ""}
              >
                <PostItemInside
                  post={post}
                  titleTag="h3"
                  className="hidden sm:block h-full"
                  urlPrefix={urlPrefix}
                />
                {/* only for mobile - list style */}
                <PostItemSimple
                  post={post}
                  titleTag="h3"
                  className="sm:hidden border-b border-grey-400 pb-3"
                  urlPrefix={urlPrefix}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>{messages.post.notFound}</div>
      )}
    </>
  );
};
