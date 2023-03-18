import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleImagesService } from './article-images.service';
import { ArticleImagesController } from './article-images.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ArticleImage } from './entities/article-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleImage])],
  controllers: [ArticleImagesController],
  providers: [ArticleImagesService],
  exports: [ArticleImagesService],
})
export class ArticleImagesModule {}
