import { Module } from '@nestjs/common';
import { ThreadImagesService } from './thread-images.service';
import { ThreadImagesController } from './thread-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadImage } from './entities/thread-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadImage])],
  providers: [ThreadImagesService],
  exports: [ThreadImagesService],
})
export class ThreadImagesModule {}
