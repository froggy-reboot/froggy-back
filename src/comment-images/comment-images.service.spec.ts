import { Test, TestingModule } from '@nestjs/testing';
import { CommentImagesService } from './comment-images.service';

describe('CommentImagesService', () => {
  let service: CommentImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentImagesService],
    }).compile();

    service = module.get<CommentImagesService>(CommentImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
