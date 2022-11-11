import React, { FC, Fragment, useEffect, useState } from "react";
import type { PostProps } from "@/shared/types";
import { FullLoader } from "@/shared/ui/loaders";
import { useRouter } from "next/router";
import { Button } from "@/shared/ui/buttons";
import { PostItem } from "@/entities/post/ui/post-item";
import { getPosts, getPostsByTaxonomySlug } from "@/shared/api/posts";
import { PostItemInside } from "@/entities/post/ui/post-item-inside";
import { messages } from "@/shared/constants";
import { DynamicAdvert } from "@/shared/ui/advert";
import { useSettings } from "@/app/contexts/settings-context";
import { SEO } from "@/shared/ui/SEO";

interface Props {
  initPosts: PostProps[];
  limit?: number;
  urlPrefix: string;
}

const getTitle = (urlPrefix: string, categoryName: string | undefined) => {
  if (urlPrefix === "news") {
    return `Новости${categoryName ? ` - ${categoryName}` : ""}`;
  }
  if (urlPrefix === "article") return "Статьи";
  return undefined;
};

export const PostListShowMore: FC<Props> = ({
  initPosts = [],
  limit = 13,
  urlPrefix,
}) => {
  const [posts, setPosts] = useState<PostProps[]>(initPosts);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const categorySlug = router.query.category ?? urlPrefix;
  const { advert } = useSettings();

  const settings = useSettings();
  const postUrl = `${settings.siteUrl}${router.asPath}`;

  const taxonomy = [
    ...settings.taxonomies.categories,
    ...settings.taxonomies.geography,
  ].find((tax) => tax.slug === categorySlug);

  const title = getTitle(urlPrefix, taxonomy?.name);
  const description = taxonomy?.description || undefined;

  console.log(taxonomy);

  useEffect(() => {
    setPosts(initPosts);
  }, [initPosts]);

  const handleShowMore = async () => {
    const offset = posts.length;
    setLoading(true);
    try {
      let fetchedPosts: PostProps[] = [];

      if (categorySlug === "news") {
        fetchedPosts = await getPosts({
          postType: "post",
          limit,
          offset,
          relations: { taxonomy: true },
        });
      } else if (categorySlug === "article") {
        fetchedPosts = await getPosts({
          postType: "article",
          limit,
          offset,
          relations: { taxonomy: true },
        });
      } else {
        fetchedPosts = await getPostsByTaxonomySlug(categorySlug as string, {
          limit,
          offset,
          relations: { taxonomy: true },
        });
      }
      fetchedPosts?.length && setPosts((prev) => [...prev, ...fetchedPosts]);
    } catch (e) {
      console.log("error");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="relative flex flex-wrap -m-2">
        <SEO
          title={title}
          description={description}
          openGraph={{
            title,
            description: description,
            url: postUrl,
          }}
        />

        {loading && <FullLoader />}
        {!Boolean(posts.length) && (
          <div className="p-2">{messages.post.notFound}</div>
        )}
        {posts.map((post, index) => {
          const isFirst = index % limit === 0;
          return isFirst ? (
            <Fragment key={post.id}>
              <PostItemInside
                post={post}
                titleTag="h2"
                className="h-[260px] sm:h-[320px] lg:h-[460px] m-2 mb-6"
                urlPrefix={urlPrefix}
              />

              {/* advert */}
              {advert &&
                index === 0 &&
                !!Number(advert.advert_block_1_visible) && (
                  <DynamicAdvert
                    className="mb-5"
                    type={advert.advert_block_1_type}
                    size="1000x120"
                    imageUrl={advert.advert_block_1_image_url}
                    href={advert.advert_block_1_href}
                    htmlCode={advert.advert_block_1_html_code}
                  />
                )}
            </Fragment>
          ) : (
            <PostItem
              key={post.id}
              post={post}
              className="p-2 sm:w-1/2 lg:w-1/3"
              urlPrefix={urlPrefix}
            />
          );
        })}
      </div>

      {/*
      show more button, news.length % limit - condition for detect last news,
      if not a full array, then last news
      */}
      {posts?.length > 0 && posts.length % limit === 0 && (
        <div className="mt-3 text-center">
          <Button variant="outline" onClick={handleShowMore}>
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
};
