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
  createdDate?: string;
  createdTime?: string;
  updatedAt?: string;
  taxonomyId?: number[];
  taxonomies?: TaxonomiesProps;
  user?: string;
  sticky?: boolean;
  views?: number;
  preview?: ImageWithSizes;
  meta?: { [key: string]: any };
  seo?: Record<string, string>;
  comments?: CommentProps[];
}

export interface ListPostProps {
  [key: string]: PostProps[];
}

export interface ImageProps {
  width?: string;
  height?: string;
  filesize?: number;
  url?: string;
  alt?: string;
  mimeType?: string;
  description?: string;
  caption?: string;
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

export interface CommentProps {
  id: number;
  postId: number;
  author: string;
  authorEmail?: string;
  authorUrl?: string;
  authorIP?: string;
  createdAt: string;
  createdDate?: string;
  createdTime?: string;
  createdAtGmt?: string;
  commentStatus: string;
  content: string;
  karma?: number;
  approved?: string;
  agent?: string;
  type?: string;
  parent?: number;
  userId?: number;
}
