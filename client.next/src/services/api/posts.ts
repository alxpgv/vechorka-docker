import { api } from "@/services/api/core";
import { ListPostProps, PostProps, PostType } from "@/types";
import { encodeQueryData } from "@/utils/helpers";

interface PostParams {
  offset?: number;
  limit?: number;
  postType?: PostType;
  relations?: { taxonomy?: boolean; user?: boolean };
  sticky?: boolean;
}

export const getHomePosts = (isSSG = false): Promise<ListPostProps> => {
  return api.get("posts/index", isSSG);
};

export const getPost = (slug: string): Promise<PostProps> => {
  return api.get(`posts/slug/${slug}`);
};

export const getPosts = (params: PostParams): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts${queryParams ? `?${queryParams}` : ""}`);
};

export const getPostsByTaxonomy = (
  taxonomyId: number,
  params: PostParams
): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(
    `posts/taxonomy/${taxonomyId}${queryParams ? `?${queryParams}` : ""}`
  );
};

export const getPostsByTaxonomySlug = async (
  slug: string,
  params: PostParams
): Promise<PostProps[]> => {
  // slugTaxonomy === "news" - select all news
  if (slug === "news") {
    return getPosts({ postType: "post", ...params });
  }

  const queryParams = encodeQueryData(params);
  return api.get(
    `posts/taxonomy/slug/${slug}${queryParams ? `?${queryParams}` : ""}`
  );
};
