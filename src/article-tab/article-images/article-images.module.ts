import { Module } from '@nestjs/common';
import { ArticleImagesService } from './article-images.service';
import { ArticleImagesController } from './article-images.controller';
import { ArticleImage } from './entities/article-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleImage])],
  controllers: [ArticleImagesController],
  providers: [ArticleImagesService],
  exports: [ArticleImagesService],
})
export class ArticleImagesModule {}
