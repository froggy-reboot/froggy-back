import { Article } from '../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from '../../utils/types/pagination-options';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findArticleList(paginationOptions: IPaginationOptions) {

    return this.createQueryBuilder('comment')
      .select('count(*) as commentCount')
      .groupBy('comment.post_id')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .getRawMany();
  }
}