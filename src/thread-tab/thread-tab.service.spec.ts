import { Test, TestingModule } from '@nestjs/testing';
import { ThreadTabService } from './thread-tab.service';

describe('ThreadTabService', () => {
  let service: ThreadTabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadTabService],
    }).compile();

    service = module.get<ThreadTabService>(ThreadTabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
