import { Article } from '../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from '../../utils/types/pagination-options';

@Injectable()
export class ArticlesRepository extends Repository<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findArticleList(paginationOptions: IPaginationOptions) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname'])
      .leftJoin('article.comments', 'comment')
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .getMany();
    return articles;
  }

  findArticle(id: number) {
    const articleWithImages = this.repository
      .createQueryBuilder('article')
      .leftJoin('article.images', 'image')
      .select(['article', 'image.url'])
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .where('article.id =:id', { id })
      .getOne();
    return articleWithImages;
  }
}
