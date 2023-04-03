import { Module } from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { ArticleLikesController } from './article-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLike } from './entities/article-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleLike])],
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService],
})
export class ArticleLikesModule {}
