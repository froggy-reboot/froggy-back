import { Module } from '@nestjs/common';
import { CommentImagesService } from './comment-images.service';
import { CommentImagesController } from './comment-images.controller';

@Module({
  controllers: [CommentImagesController],
  providers: [CommentImagesService]
})
export class CommentImagesModule {}
