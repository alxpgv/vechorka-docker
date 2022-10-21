import { Controller, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentByPostIdParamsDTO } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComments(@Query() query: CommentByPostIdParamsDTO) {
    return this.commentService.getCommentsByPostId(query);
  }
}
