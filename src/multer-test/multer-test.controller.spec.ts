import { Test, TestingModule } from '@nestjs/testing';
import { MulterTestController } from './multer-test.controller';
import { MulterTestService } from './multer-test.service';

describe('MulterTestController', () => {
  let controller: MulterTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MulterTestController],
      providers: [MulterTestService],
    }).compile();

    controller = module.get<MulterTestController>(MulterTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
