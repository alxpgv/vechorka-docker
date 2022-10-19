import { Module } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';
import { NewspaperController } from './newspaper.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [NewspaperService],
  controllers: [NewspaperController],
  exports: [NewspaperService],
})
export class NewspaperModule {}
