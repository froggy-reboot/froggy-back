import { Test, TestingModule } from '@nestjs/testing';
import { ThreadCommentsController } from './thread-comments.controller';
import { ThreadCommentsService } from './thread-comments.service';

describe('ThreadCommentsController', () => {
  let controller: ThreadCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadCommentsController],
      providers: [ThreadCommentsService],
    }).compile();

    controller = module.get<ThreadCommentsController>(ThreadCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
