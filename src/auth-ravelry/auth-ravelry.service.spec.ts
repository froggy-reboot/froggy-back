import { Test, TestingModule } from '@nestjs/testing';
import { AuthRavelryService } from './auth-ravelry.service';

describe('AuthRavelryService', () => {
  let service: AuthRavelryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRavelryService],
    }).compile();

    service = module.get<AuthRavelryService>(AuthRavelryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
