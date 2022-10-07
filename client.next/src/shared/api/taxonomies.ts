import { TaxonomiesProps } from "@/shared/types";
import { api } from "@/shared/api/core";

export const getTaxonomiesGroup = (isSSG = false): Promise<TaxonomiesProps> => {
  return api.get("taxonomies/group", isSSG);
};
