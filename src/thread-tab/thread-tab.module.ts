import { Module } from '@nestjs/common';
import { ThreadTabService } from './thread-tab.service';
import { ThreadTabController } from './thread-tab.controller';
import { PatternsService } from 'src/patterns/patterns.service';
import { PatternsModule } from 'src/patterns/patterns.module';
import { ThreadsService } from './threads/threads.service';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/utils/common/multer.option';
import { ThreadImagesModule } from './thread-images/thread-images.module';
import { Thread } from './threads/entities/thread.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadsModule } from './threads/threads.module';
import { ThreadImage } from './thread-images/entities/thread-image.entity';
import { Pattern } from 'src/patterns/entities/pattern.entity';
import { ThreadsRepository } from './threads/repository/thread.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread, ThreadImage, Pattern]),
    PatternsModule,
    ThreadImagesModule,
    UsersModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [ThreadTabController],
  providers: [
    ThreadTabService,
    ThreadsService,
    PatternsService,
    RavelryApiService,
    ThreadsRepository,
  ],
})
export class ThreadTabModule {}
