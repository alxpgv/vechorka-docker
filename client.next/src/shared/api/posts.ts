import { api } from "@/shared/api/core";
import { ListPostProps, PostProps, PostType } from "@/shared/types";
import { encodeQueryData } from "@/shared/lib/helpers";

interface GetPostsParams {
  taxonomyId?: number;
  offset?: number;
  limit?: number;
  postType?: PostType;
  excludeIds?: string;
  includeIds?: string;
  relations?: { taxonomy?: boolean; user?: boolean };
  sticky?: boolean;
}

interface GetPostParams {
  slugTaxonomy?: string;
  withRelatedPosts?: boolean;
  postType?: PostType;
}

export const getHomePosts = (isSSG = false): Promise<ListPostProps> => {
  return api.get("posts/index", isSSG);
};

export const getPost = (slug: string, params?: GetPostParams) => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts/slug/${slug}${queryParams ? `?${queryParams}` : ""}`);
};

export const getPosts = (params: GetPostsParams): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts${queryParams ? `?${queryParams}` : ""}`);
};

export const getPostsByTaxonomySlug = async (
  slug: string,
  params: GetPostsParams
): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(
    `posts/taxonomy/slug/${slug}${queryParams ? `?${queryParams}` : ""}`
  );
};

export const getPostsTop = (): Promise<PostProps[]> => {
  return api.get("posts/top");
};

export const getPostsCommented = (): Promise<PostProps[]> => {
  return api.get("posts/commented");
};

export const getPostsInterest = (): Promise<PostProps[]> => {
  return api.get("posts/interest");
};
