import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { ThreadImagesModule } from '../thread-images/thread-images.module';
import { ThreadImagesService } from '../thread-images/thread-images.service';
import { ThreadsRepository } from './repository/thread.repository';
import { UsersService } from '../../users/users.service';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Thread]),
    ThreadImagesModule,
    UsersModule,
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
  exports: [ThreadsService],
})
export class ThreadsModule {}
