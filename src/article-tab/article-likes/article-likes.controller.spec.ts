import { Test, TestingModule } from '@nestjs/testing';
import { ArticleLikesController } from './article-likes.controller';
import { ArticleLikesService } from './article-likes.service';

describe('ArticleLikesController', () => {
  let controller: ArticleLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleLikesController],
      providers: [ArticleLikesService],
    }).compile();

    controller = module.get<ArticleLikesController>(ArticleLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
