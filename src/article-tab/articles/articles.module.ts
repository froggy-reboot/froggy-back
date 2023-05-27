import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Comment } from '../comments/entities/comment.entity';
import { ArticlesRepository } from './repository/article.repository';
import { UsersModule } from '../../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleImagesModule } from 'src/article-tab/article-images/article-images.module';
import { multerOptionsFactory } from 'src/utils/common/multer.option';
import { ArticleLikesService } from '../article-likes/article-likes.service';
import { ArticleLikesModule } from '../article-likes/article-likes.module';
import { ArticleLike } from '../article-likes/entities/article-like.entity';
import { ArticlesReadService } from './services/articles.read.service';
import { ArticlesReportService } from './services/articles.report.service';
import { ReportService } from 'src/report/report.service';
import { ReportModule } from 'src/report/report.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, ArticleLike]),
    UsersModule,
    ArticleImagesModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
    ArticleLikesModule,
    ReportModule,
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    ArticlesRepository,
    ArticleLikesService,
    ArticlesReadService,
    ArticlesReportService,
  ],
  exports: [ArticlesService, ArticlesReadService, ArticlesReportService],
})
export class ArticlesModule {}
