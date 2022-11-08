import { getGeneralSettings } from "@/shared/api/settings";
import { getPostBySlug, getPostsInterest } from "@/shared/api/posts";
import type { GetServerSidePropsResult } from "next";
import type { PostProps } from "@/shared/types";

export const getPage = async ({
  slug,
}: {
  slug?: string;
}): Promise<GetServerSidePropsResult<any>> => {
  if (!slug) {
    return {
      notFound: true,
    };
  }

  let posts = { post: null };
  let interestNews: PostProps[] = [];

  try {
    posts = await getPostBySlug(slug);
  } catch (error) {
    console.log("page", error);
  }

  if (!posts.post) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  // interest news
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("interest", error);
  }

  return {
    props: {
      post: posts.post,
      interestNews,
      settings,
      taxonomies,
      advert,
    },
  };
};
