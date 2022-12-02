import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentByPostIdParamsDTO, CreateCommentDto } from './comment.dto';
import { CommentResponse } from './comment.interface';
import { PostService } from '../post/post.service';
import { formatISODate, formatISOTime } from '../../utils/date';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private postService: PostService,
  ) {}

  async getCommentsByPostId({
    postId,
    offset = 0,
    limit = 20,
  }: CommentByPostIdParamsDTO) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment_approved = 1 AND comment_post_ID=:postId', { postId })
      .orderBy('comment_date', 'ASC')
      .offset(offset)
      .limit(limit)
      .getMany();

    return this.responseData(comments);
  }

  async createComment(body: CreateCommentDto) {
    const { postId, author, content } = body;

    const post = await this.postService.getOnePostById({ postId });
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const date = new Date();

    const newComment = {
      comment_post_ID: postId,
      comment_author: author,
      comment_content: content,
      comment_date: String(date),
      comment_date_gmt: String(date),
      comment_approved: '0',
      // comment_parent
      // comment_author_IP
    };

    const comment = this.commentRepository.create(newComment);

    await this.commentRepository.save(comment);
    return this.responseData([comment])[0];
  }

  private responseData(comments: Comment[]): CommentResponse[] {
    return comments.map((comment) => {
      return {
        id: comment.comment_ID,
        postId: comment.comment_post_ID,
        author: comment.comment_author,
        // authorEmail: comment.comment_author_email,
        // authorUrl: comment.comment_author_url,
        authorIP: comment.comment_author_IP,
        createdAt: comment.comment_date,
        createdDate: formatISODate(comment.comment_date),
        createdTime: formatISOTime(comment.comment_date),
        // createdAtGmt: comment.comment_date_gmt,
        content: comment.comment_content,
        // karma: comment.comment_karma,
        // approved: comment.comment_approved,
        // agent: comment.comment_agent,
        // type: comment.comment_type,
        parent: comment.comment_parent,
        // userId: comment.user_id,
      };
    });
  }
}
