import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { ThreadImagesModule } from '../thread-images/thread-images.module';
import { ThreadImagesService } from '../thread-images/thread-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Thread]), ThreadImagesModule],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadImagesService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
