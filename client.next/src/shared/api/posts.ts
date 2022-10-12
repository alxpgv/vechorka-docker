import { api } from "@/shared/api/core";
import { ListPostProps, PostProps, PostType } from "@/shared/types";
import { encodeQueryData } from "@/shared/lib/helpers";

interface PostParams {
  taxonomyId?: number;
  offset?: number;
  limit?: number;
  postType?: PostType;
  excludeIds?: string;
  relations?: { taxonomy?: boolean; user?: boolean };
  sticky?: boolean;
}

export const getHomePosts = (isSSG = false): Promise<ListPostProps> => {
  return api.get("posts/index", isSSG);
};

export const getPost = (
  slug: string,
  slugTaxonomy?: string
): Promise<PostProps> => {
  return api.get(
    `posts/slug/${slug}${slugTaxonomy ? `?slugTaxonomy=${slugTaxonomy}` : ""}`
  );
};

export const getPosts = (params: PostParams): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts${queryParams ? `?${queryParams}` : ""}`);
};

export const getPostsByTaxonomySlug = async (
  slug: string,
  params: PostParams
): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(
    `posts/taxonomy/slug/${slug}${queryParams ? `?${queryParams}` : ""}`
  );
};
