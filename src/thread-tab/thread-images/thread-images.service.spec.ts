import { Test, TestingModule } from '@nestjs/testing';
import { ThreadImagesService } from './thread-images.service';

describe('ThreadImagesService', () => {
  let service: ThreadImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadImagesService],
    }).compile();

    service = module.get<ThreadImagesService>(ThreadImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
