import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  CommentsController,
  MyCommentsController,
} from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentImagesModule } from 'src/article-tab/comment-images/comment-images.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticlesModule } from '../articles/articles.module';
import { multerOptionsFactory } from 'src/utils/common/multer.option';
import { ReportModule } from 'src/report/report.module';
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
    ReportModule,
  ],
  controllers: [CommentsController, MyCommentsController],
  providers: [CommentsService, ConfigModule, ConfigService],
})
export class CommentsModule {}
