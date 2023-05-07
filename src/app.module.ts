import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthNaverModule } from './auth-naver/auth-naver.module';
import { AuthRavelryModule } from './auth-ravelry/auth-ravelry.module';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthKakaoModule } from './auth-kakao/auth-kakao.module';
import { CommentsModule } from './comments/comments.module';
import { RavelryUsersModule } from './ravelry-users/ravelry-users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';

import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import kakaoConfig from './config/kakao.config';
import googleConfig from './config/google.config';
import naverConfig from './config/naver.config';

import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { DataSource } from 'typeorm';
import { ArticleLikesModule } from './article-likes/article-likes.module';

import { LoggerMiddleware } from './utils/common/middleware/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ArticleImagesModule } from './article-images/article-images.module';
import { AuthTokenMiddleware } from './utils/common/middleware/auth.token';
import { ThreadsModule } from './threads/threads.module';
import { ThreadImagesModule } from './thread-images/thread-images.module';
import { PatternsModule } from './patterns/patterns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        kakaoConfig,
        googleConfig,
        naverConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return [configService.get('app.headerLanguage')];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: {
          expiresIn: configService.get('auth.expires'),
        },
      }),
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthGoogleModule,
    AuthNaverModule,
    AuthRavelryModule,
    AuthKakaoModule,
    ForgotModule,
    MailModule,
    HomeModule,
    ArticlesModule,
    CommentsModule,
    RavelryUsersModule,
    ArticleLikesModule,
    ArticleImagesModule,
    ThreadsModule,
    ThreadImagesModule,
    PatternsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
