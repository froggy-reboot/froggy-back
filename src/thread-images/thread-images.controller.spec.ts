import { Test, TestingModule } from '@nestjs/testing';
import { ThreadImagesController } from './thread-images.controller';
import { ThreadImagesService } from './thread-images.service';

describe('ThreadImagesController', () => {
  let controller: ThreadImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadImagesController],
      providers: [ThreadImagesService],
    }).compile();

    controller = module.get<ThreadImagesController>(ThreadImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
