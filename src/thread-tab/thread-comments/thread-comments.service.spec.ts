import { Test, TestingModule } from '@nestjs/testing';
import { ThreadCommentsService } from './thread-comments.service';

describe('ThreadCommentsService', () => {
  let service: ThreadCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadCommentsService],
    }).compile();

    service = module.get<ThreadCommentsService>(ThreadCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
