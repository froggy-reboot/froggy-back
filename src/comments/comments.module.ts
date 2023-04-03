import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentImagesModule } from 'src/comment-images/comment-images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ArticlesModule } from '../articles/articles.module';
import { multerOptionsFactory } from 'src/utils/common/multer.option';
@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CommentImagesModule,
    ArticlesModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ConfigModule, ConfigService],
})
export class CommentsModule {}
