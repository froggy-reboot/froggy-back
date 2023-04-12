import { Injectable } from '@nestjs/common';
import { CreateArticleLikeDto } from './dto/create-article-like.dto';
import { UpdateArticleLikeDto } from './dto/update-article-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleLike } from './entities/article-like.entity';
import { Repository } from 'typeorm';
import { Article } from 'src/articles/entities/article.entity';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class ArticleLikesService {
  constructor(
    @InjectRepository(ArticleLike)
    private articleLikesRepository: Repository<ArticleLike>,
    private articleService: ArticlesService,
  ) {}
  create(createArticleLikeDto) {
    return this.articleLikesRepository.save(
      this.articleLikesRepository.create(createArticleLikeDto),
    );
  }

  async toggleLike(createArticleLikeDto) {
    const articleLike = await this.articleLikesRepository.findOne({
      where: {
        userId: createArticleLikeDto.userId,
        articleId: createArticleLikeDto.articleId,
      },
    });
    if (articleLike) {
      await this.articleLikesRepository.delete(articleLike.id);
      await this.articleService.updateLikeCount(articleLike.articleId, 'sub');
    } else {
      await this.articleLikesRepository.save(
        this.articleLikesRepository.create(createArticleLikeDto),
      );
      await this.articleService.updateLikeCount(
        createArticleLikeDto.articleId,
        'add',
      );
    }
  }

  findAll() {
    return `This action returns all articleLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articleLike`;
  }

  update(id: number, updateArticleLikeDto: UpdateArticleLikeDto) {
    return `This action updates a #${id} articleLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} articleLike`;
  }
}
