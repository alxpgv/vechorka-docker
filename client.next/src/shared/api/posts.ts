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
  relations?: { taxonomy?: boolean; user?: boolean; content?: boolean };
  sticky?: boolean;
}

interface GetPostBySlugParams {
  slugTaxonomy?: string;
  withRelatedPosts?: boolean;
  postType?: PostType;
}

interface GetPostByIdParams {
  withMeta?: boolean;
}

export const getHomePosts = (isSSG = false): Promise<ListPostProps> => {
  return api.get("posts/index", isSSG);
};

export const getPostBySlug = (slug: string, params?: GetPostBySlugParams) => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts/slug/${slug}${queryParams ? `?${queryParams}` : ""}`);
};

export const getPostById = (postId: number, params?: GetPostByIdParams) => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts/id/${postId}${queryParams ? `?${queryParams}` : ""}`);
};

export const getPosts = (
  params: GetPostsParams,
  isSSG = false
): Promise<PostProps[]> => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts${queryParams ? `?${queryParams}` : ""}`, isSSG);
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

export const addPostPollReply = (body: {
  postId: number;
  pollId: number;
  pollKey: string;
}) => {
  return api.post("posts/poll", body);
};
