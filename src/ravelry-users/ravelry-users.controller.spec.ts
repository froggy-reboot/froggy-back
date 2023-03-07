import { Test, TestingModule } from '@nestjs/testing';
import { RavelryUsersController } from './ravelry-users.controller';
import { RavelryUsersService } from './ravelry-users.service';

describe('RavelryUsersController', () => {
  let controller: RavelryUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RavelryUsersController],
      providers: [RavelryUsersService],
    }).compile();

    controller = module.get<RavelryUsersController>(RavelryUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
