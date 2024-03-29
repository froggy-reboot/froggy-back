import { Module, forwardRef } from '@nestjs/common';
import { ArticleLikesService } from './article-likes.service';
import { ArticleLikesController } from './article-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLike } from './entities/article-like.entity';
import { ArticlesModule } from 'src/article-tab/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleLike]),
    forwardRef(() => ArticlesModule),
  ],
  controllers: [ArticleLikesController],
  providers: [ArticleLikesService],
})
export class ArticleLikesModule {}
