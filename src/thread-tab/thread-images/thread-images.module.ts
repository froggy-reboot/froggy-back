import { Module } from '@nestjs/common';
import { ThreadImagesService } from './thread-images.service';
import { ThreadImagesController } from './thread-images.controller';

@Module({
  controllers: [ThreadImagesController],
  providers: [ThreadImagesService]
})
export class ThreadImagesModule {}
