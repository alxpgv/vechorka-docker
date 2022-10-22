export interface CommentResponse {
  id: number;
  postId: number;
  author: string;
  authorEmail?: string;
  authorUrl?: string;
  authorIP?: string;
  createdAt: Date;
  createdAtGmt?: Date;
  content: string;
  karma?: number;
  approved?: string;
  agent?: string;
  type?: string;
  parent: number;
  userId?: number;
}
