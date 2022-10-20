import { SEOProps } from "@/shared/ui/SEO";

export type PostType =
  | "post"
  | "page"
  | "article"
  | "video"
  | "attachment"
  | "employee";

export enum EmployerRoleEnum {
  chief = "Главный редактор",
  correspondent = "Корреспондент",
  editor = "Редактор службы информации",
  photographer = "Фотограф",
}

export interface PostProps {
  id: number;
  guid?: string;
  slug: string;
  type?: PostType;
  title: string;
  content?: string;
  excerpt?: string;
  commentStatus?: string;
  commentCount?: number;
  status?: string;
  createdAt: string;
  updatedAt?: string;
  taxonomyId?: number[];
  taxonomies?: TaxonomiesProps;
  user?: string;
  sticky?: boolean;
  views?: number;
  preview?: ImageWithSizes;
  meta?: { [key: string]: any };
  seo?: SEOProps;
}

export interface ListPostProps {
  [key: string]: PostProps[];
}

export interface ImageProps {
  width?: number;
  height?: number;
  filesize?: number;
  url?: string;
  alt?: string;
  mimeType?: string;
}

export interface ImageWithSizes extends ImageProps {
  sizes?: {
    [key: string]: ImageProps;
  };
}

export interface TaxonomyProps {
  id: number; // term_id
  taxonomyId?: number;
  taxonomy?: string;
  description?: string;
  parent?: number;
  count?: number;
  name: string;
  slug: string;
}

export interface TaxonomiesProps {
  categories: TaxonomyProps[];
  geography: TaxonomyProps[];
  tags: TaxonomyProps[];
}

export interface NewsPaperPost extends Partial<PostProps> {
  attached: string;
}

export interface NewsPaperPosts {
  // key is month
  [key: number]: NewsPaperPost[];
}

export interface NewsPaperAllProps {
  posts: NewsPaperPosts;
  postsMonths: number[];
  postsYear: number;
  allYears: number[];
  lastRelease: NewsPaperPost;
}
