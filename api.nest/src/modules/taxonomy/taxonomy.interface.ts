export interface TaxonomyResponse {
  id: number;
  taxonomyId: number;
  taxonomy?: string;
  description: string;
  parent: number;
  count?: number;
  name: string;
  slug: string;
}

export interface TaxonomiesProps {
  categories: TaxonomyResponse[];
  tags: TaxonomyResponse[];
}
