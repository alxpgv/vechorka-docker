import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
