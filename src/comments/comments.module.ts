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
@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CommentImagesModule,
    ArticlesModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const storages = {
          s3: () => {
            const s3 = new AWS.S3();
            AWS.config.update({
              accessKeyId: configService.get('file.accessKeyId'),
              secretAccessKey: configService.get('file.secretAccessKey'),
              region: configService.get('file.awsS3Region'),
            });

            return multerS3({
              s3: s3,
              bucket: configService.get('file.awsDefaultS3Bucket'),
              acl: 'public-read',
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: (request, file, callback) => {
                callback(
                  null,
                  `${randomStringGenerator()}.${file.originalname
                    .split('.')
                    .pop()
                    .toLowerCase()}`,
                );
              },
            });
          },
        };
        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
              return callback(
                new HttpException(
                  {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                      file: `cantUploadFileType`,
                    },
                  },
                  HttpStatus.UNPROCESSABLE_ENTITY,
                ),
                false,
              );
            }

            callback(null, true);
          },
          storage: storages[configService.get('file.driver')](),
          limits: {
            fileSize: configService.get('file.maxFileSize'),
          },
        };
      },
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, ConfigModule, ConfigService],
})
export class CommentsModule {}
