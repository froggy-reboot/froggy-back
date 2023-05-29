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
    const article = await this.articleCustomRepository.findArticle(+id);
    article.content = this.convertFromDatabaseFormat(article.content);
    return article;
  }

  async findAllByFilter(
    paginationOptions: IPaginationOptions,
    filterOptions: FilterOptions,
    search: string,
  ) {
    let articles;

    if (search !== undefined) {
      articles = await this.articleCustomRepository.findSearchArticleList(
        search,
        paginationOptions,
      );
    } else if (filterOptions.filter == '인기') {
      articles = await this.articleCustomRepository.findHotArticleList(
        filterOptions.articleType,
        paginationOptions,
      );
    } else {
      articles = await this.articleCustomRepository.findRecentArticleList(
        filterOptions.articleType,
        paginationOptions,
      );
    }

    articles = articles.map((article) => ({
      ...article,
      content: this.convertFromDatabaseFormat(article.content),
    }));

    return articles;
  }

  async findArticleByMe(paginationOptions: IPaginationOptions, userId: number) {
    let articles;
    articles = await this.articleCustomRepository.findArticlesByMe(
      userId,
      paginationOptions,
    );
    articles = articles.map((article) => ({
      ...article,
      content: this.convertFromDatabaseFormat(article.content),
    }));

    return articles;
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id: id } });
  }

  convertFromDatabaseFormat(input: string): string {
    return input.replace(/<br>/g, '\n');
  }
}
