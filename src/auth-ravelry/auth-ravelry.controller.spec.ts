import { Test, TestingModule } from '@nestjs/testing';
import { AuthRavelryController } from './auth-ravelry.controller';

describe('AuthRavelryController', () => {
  let controller: AuthRavelryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthRavelryController],
    }).compile();

    controller = module.get<AuthRavelryController>(AuthRavelryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
