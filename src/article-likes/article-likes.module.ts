import { Module } from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { ArticleLikesController } from './article-likes.controller';

@Module({
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService]
})
export class ArticleLikesModule {}
