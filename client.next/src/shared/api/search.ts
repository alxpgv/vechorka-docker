import { api } from "@/shared/api/core";
import { encodeQueryData } from "@/shared/lib/helpers";

interface SearchPostsParams {
  offset?: number;
  limit?: number;
}

export const searchPosts = (q: string, params?: SearchPostsParams) => {
  const queryParams = encodeQueryData(params);
  return api.get(`posts/search?q=${q}${queryParams ? `&${queryParams}` : ""}`);
};
