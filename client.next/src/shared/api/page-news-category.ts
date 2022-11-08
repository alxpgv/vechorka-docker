import { getGeneralSettings } from "@/shared/api/settings";
import {
  getPosts,
  getPostsByTaxonomySlug,
  getPostsInterest,
} from "@/shared/api/posts";
import type { GetServerSidePropsResult } from "next";
import type { ListPostProps } from "@/shared/types";

export const getPageNewsCategory = async ({
  slugTaxonomy,
}: {
  slugTaxonomy?: string;
}): Promise<GetServerSidePropsResult<any>> => {
  const posts: ListPostProps = {
    news: [],
    interestNews: [],
  };

  if (!slugTaxonomy) {
    return {
      notFound: true,
    };
  }

  //news by slug
  try {
    // all news
    if (slugTaxonomy === "news") {
      posts.news = await getPosts({
        postType: "post",
        limit: 13,
        relations: { taxonomy: true },
      });
      // from taxonomy news
    } else {
      posts.news = await getPostsByTaxonomySlug(slugTaxonomy, {
        limit: 13,
        relations: { taxonomy: true },
      });
    }
  } catch (error) {
    console.log("category post taxonomy slug", error);
  }

  if (!posts.news || !Array.isArray(posts.news) || !posts.news.length) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  // interest news
  try {
    posts.interestNews = await getPostsInterest();
  } catch (error) {
    console.log("category interest", error);
  }

  return {
    props: {
      posts,
      settings,
      taxonomies,
      advert,
    },
  };
};
