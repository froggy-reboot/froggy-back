import { Test, TestingModule } from '@nestjs/testing';
import { MulterTestService } from './multer-test.service';

describe('MulterTestService', () => {
  let service: MulterTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MulterTestService],
    }).compile();

    service = module.get<MulterTestService>(MulterTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
