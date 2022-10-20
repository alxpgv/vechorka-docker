import { getGeneralSettings } from "@/shared/api/settings";
import { getPost, getPosts } from "@/shared/api/posts";
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
    posts = await getPost(slug);
  } catch (error) {
    console.log("page", error);
  }

  if (!posts.post) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings();

  // interest news
  try {
    interestNews = await getPosts({
      limit: 4,
      relations: { taxonomy: true },
    });
  } catch (error) {
    console.log("interest", error);
  }

  return {
    props: {
      post: posts.post,
      interestNews,
      settings,
      taxonomies,
    },
  };
};
