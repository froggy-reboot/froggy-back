import { Test, TestingModule } from '@nestjs/testing';
import { ThreadTabController } from './thread-tab.controller';
import { ThreadTabService } from './thread-tab.service';

describe('ThreadTabController', () => {
  let controller: ThreadTabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadTabController],
      providers: [ThreadTabService],
    }).compile();

    controller = module.get<ThreadTabController>(ThreadTabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
