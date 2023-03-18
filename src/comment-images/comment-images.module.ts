import { Module } from '@nestjs/common';
import { CommentImagesService } from './comment-images.service';
import { CommentImagesController } from './comment-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentImage } from './entities/comment-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentImage])],
  controllers: [CommentImagesController],
  providers: [CommentImagesService],
  exports: [CommentImagesModule],
})
export class CommentImagesModule {}
