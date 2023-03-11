import { Test, TestingModule } from '@nestjs/testing';
import { RavelryUsersService } from './ravelry-users.service';

describe('RavelryUsersService', () => {
  let service: RavelryUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RavelryUsersService],
    }).compile();

    service = module.get<RavelryUsersService>(RavelryUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
