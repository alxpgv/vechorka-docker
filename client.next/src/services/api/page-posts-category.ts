import { getGeneralSettings } from "@/services/api/settings";
import { GetServerSidePropsResult } from "next";
import { getPosts, getPostsByTaxonomySlug } from "@/services/api/posts";
import type { ListPostProps } from "@/types";

export const getPagePostsCategory = async ({
  slugTaxonomy,
}: {
  slugTaxonomy: string;
}): Promise<GetServerSidePropsResult<any>> => {
  const posts: ListPostProps = {
    news: [],
    interestNews: [],
  };

  const { settings, taxonomies } = await getGeneralSettings();

  //news by slug
  try {
    posts.news = await getPostsByTaxonomySlug(slugTaxonomy, {
      limit: 13,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("category post taxonomy slug", error);
  }

  // interest news
  try {
    posts.interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("category interest", error);
  }

  return {
    props: {
      posts,
      settings,
      taxonomies,
    },
  };
};
