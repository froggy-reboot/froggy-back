import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';

import kakaoConfig from './config/kakao.config';
import googleConfig from './config/google.config';
import twitterConfig from './config/twitter.config';
import naverConfig from './config/naver.config';

import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { AuthFacebookModule } from './auth-facebook/auth-facebook.module';
// import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthNaverModule } from './auth-naver/auth-naver.module';
import { AuthRavelryModule } from './auth-ravelry/auth-ravelry.module';

import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailConfigService } from './mail/mail-config.service';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource } from 'typeorm';
import { ArticlesModule } from './articles/articles.module';
import { AuthKakaoModule } from './auth-kakao/auth-kakao.module';
import { CommentsModule } from './comments/comments.module';
import { RavelryUsersModule } from './ravelry-users/ravelry-users.module';

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
        twitterConfig,
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
  ],
})
export class AppModule {}
