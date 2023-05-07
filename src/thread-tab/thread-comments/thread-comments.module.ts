import { Module } from '@nestjs/common';
import { ThreadCommentsService } from './thread-comments.service';
import { ThreadCommentsController } from './thread-comments.controller';

@Module({
  controllers: [ThreadCommentsController],
  providers: [ThreadCommentsService]
})
export class ThreadCommentsModule {}
