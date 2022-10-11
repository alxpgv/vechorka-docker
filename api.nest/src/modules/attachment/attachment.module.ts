import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';

@Module({
  imports: [],
  providers: [AttachmentService],
  controllers: [],
  exports: [AttachmentService],
})
export class AttachmentModule {}
