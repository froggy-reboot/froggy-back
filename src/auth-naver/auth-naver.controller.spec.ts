import { Test, TestingModule } from '@nestjs/testing';
import { AuthNaverController } from './auth-naver.controller';

describe('AuthNaverController', () => {
  let controller: AuthNaverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthNaverController],
    }).compile();

    controller = module.get<AuthNaverController>(AuthNaverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
