import { api } from "@/shared/api/core";
import { encodeQueryData } from "@/shared/lib/helpers";

interface Params {
  year?: number;
  allYears?: boolean;
  lastRelease?: boolean;
}

export const getNewspapers = (params: Params) => {
  const queryParams = encodeQueryData(params);
  return api.get(`newspaper${queryParams ? `?${queryParams}` : ""}`);
};
