import { Test, TestingModule } from '@nestjs/testing';
import { CommentImagesController } from './comment-images.controller';
import { CommentImagesService } from './comment-images.service';

describe('CommentImagesController', () => {
  let controller: CommentImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentImagesController],
      providers: [CommentImagesService],
    }).compile();

    controller = module.get<CommentImagesController>(CommentImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
