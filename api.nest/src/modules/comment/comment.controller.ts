import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentByPostIdParamsDTO, CreateCommentDto } from './comment.dto';
import { IpAddress } from '../../utils/decorators/ip-address';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComments(@Query() query: CommentByPostIdParamsDTO) {
    return this.commentService.getCommentsByPostId(query);
  }

  @Post()
  create(@Body() body: CreateCommentDto, @IpAddress() ipAddress) {
    console.log('=====ip:', ipAddress);
    return this.commentService.createComment(body);
  }
}
