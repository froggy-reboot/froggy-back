import { Test, TestingModule } from '@nestjs/testing';
import { AuthNaverService } from './auth-naver.service';

describe('AuthNaverService', () => {
  let service: AuthNaverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthNaverService],
    }).compile();

    service = module.get<AuthNaverService>(AuthNaverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
