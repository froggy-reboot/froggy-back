import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { Repository } from 'typeorm';
import { ArticlesRepository } from '../repository/article.repository';
import { Comment } from '../../comments/entities/comment.entity';
import { ArticleImagesService } from '../../article-images/article-images.service';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FilterOptions } from '../../../utils/types/filter-options';

@Injectable()
export class ArticlesReadService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private articleCustomRepository: ArticlesRepository,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findArticle(id: number) {
    return await this.articleCustomRepository.findArticle(+id);
  }

  findAllByFilter(
    paginationOptions: IPaginationOptions,
    filterOptions: FilterOptions,
    search: string,
  ) {
    if (search !== undefined) {
      return this.articleCustomRepository.findSearchArticleList(
        search,
        paginationOptions,
      );
    }
    if (filterOptions.filter == '인기') {
      return this.articleCustomRepository.findHotArticleList(
        filterOptions.articleType,
        paginationOptions,
      );
    }
    return this.articleCustomRepository.findRecentArticleList(
      filterOptions.articleType,
      paginationOptions,
    );
  }

  findArticleByMe(paginationOptions: IPaginationOptions, userId: number) {
    return this.articleCustomRepository.findArticlesByMe(
      userId,
      paginationOptions,
    );
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id: id } });
  }

  convertFromDatabaseFormat(input: string): string {
    return input.replace(/<br>/g, '\n');
  }
}
