import { Article } from '../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { filters } from '../../utils/types/filter-options';

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
      .select(['article', 'user.nickname', 'user.profileImg'])
      .leftJoin('article.comments', 'comment')
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .orderBy({ 'article.createdAt': 'DESC' })
      .getMany();
    return articles;
  }

  async findArticleListByFilter(
    paginationOptions: IPaginationOptions,
    filterOptions: filters,
  ) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname', 'user.profileImg'])
      .leftJoin('article.comments', 'comment')
      .where('article.articleType = :filterOptions', { filterOptions })
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .orderBy({ 'article.createdAt': 'DESC' })
      .getMany();
    return articles;
  }

  async findArticleListByHot(paginationOptions: IPaginationOptions) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname', 'user.profileImg'])
      .leftJoin('article.comments', 'comment')
      .where('article.liked >= 5')
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .orderBy({ 'article.createdAt': 'DESC' })
      .getMany();
    return articles;
  }

  findArticle(id: number) {
    const articleWithImages = this.repository
      .createQueryBuilder('article')
      .leftJoin('article.images', 'image')
      .select(['article', 'image.url', 'image.id', 'image.order'])
      .orderBy('image.order', 'ASC')
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .where('article.id =:id', { id })
      .getOne();
    return articleWithImages;
  }

  async findSearchArticleList(target, paginationOptions: IPaginationOptions) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname', 'user.profileImg'])
      .leftJoin('article.comments', 'comment')
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .where('article.title LIKE :search', {
        search: `%${target}%`,
      })
      .orWhere('article.content LIKE :search', {
        search: `%${target}%`,
      })
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .getMany();
    return articles;
  }

  async addLikeCount(id: number) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .update(Article)
      .set({ liked: () => `liked+1` })
      .where('id = :id', { id: id })
      .execute();
    return articles;
  }

  async subLikeCount(id: number) {
    const articles = await this.repository
      .createQueryBuilder('article')
      .update(Article)
      .set({ liked: () => `liked-1` })
      .where('id = :id', { id: id })
      .execute();
    return articles;
  }
}
