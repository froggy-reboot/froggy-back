import { Article } from '../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import {
  FilterOptions,
  articleTypes,
  filters,
} from '../../utils/types/filter-options';

@Injectable()
export class ArticlesRepository extends Repository<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  // async findArticleListByHot(paginationOptions: IPaginationOptions) {
  //   const articles = await this.repository
  //     .createQueryBuilder('article')
  //     .leftJoin('article.user', 'user')
  //     .select(['article', 'user.nickname', 'user.profileImg'])
  //     .loadRelationCountAndMap('article.commentCount', 'article.comments')
  //     .where('article.liked >= :liked', { liked: 1 })
  //     /*
  //     아래의 주석을 지우지 말 것
  //     좋아요 기록을 조회하기 위해, like 다대다 테이블을 사용하는 기능이 추가될 경우,
  //     좋아요 개수 기준을 충족하는 게시글들을 반환하기 위한 조건
  //      */
  //     // .loadRelationCountAndMap(
  //     //   'article.articleLikes',
  //     //   'article.articleLikes',
  //     //   'likes',
  //     // )

  //     // .where((qb) => {
  //     //   const subQuery = qb
  //     //     .subQuery()
  //     //     .select('articleId')
  //     //     .from('articleLike', 'articleLike')
  //     //     .groupBy('articleId')
  //     //     .having('COUNT(*) > :count', { count: 0 })
  //     //     .getQuery();
  //     //   return 'article.id IN ' + subQuery;
  //     // })
  //     .limit(paginationOptions.limit)
  //     .offset(paginationOptions.limit * (paginationOptions.page - 1))
  //     .orderBy({ 'article.createdAt': 'DESC' })
  //     .getMany();
  //   return articles;
  // }

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

  async findHotArticleList(
    articleType: articleTypes,
    paginationOptions: IPaginationOptions,
  ) {
    let queryBuilder = this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname', 'user.profileImg'])
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .where('article.liked >= :liked', { liked: 1 })
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .orderBy({ 'article.createdAt': 'DESC' });

    if (
      articleType === articleTypes.free ||
      articleType === articleTypes.question
    ) {
      queryBuilder = queryBuilder.andWhere(
        'article.articleType = :articleType',
        {
          articleType,
        },
      );
    }

    const articles = await queryBuilder.getMany();
    return articles;
  }
  async findRecentArticleList(
    articleType: articleTypes,
    paginationOptions: IPaginationOptions,
  ) {
    let queryBuilder = this.repository
      .createQueryBuilder('article')
      .leftJoin('article.user', 'user')
      .select(['article', 'user.nickname', 'user.profileImg'])
      .loadRelationCountAndMap('article.commentCount', 'article.comments')
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .orderBy({ 'article.createdAt': 'DESC' });

    if (
      articleType == articleTypes.free ||
      articleType == articleTypes.question
    ) {
      queryBuilder = queryBuilder.where('article.articleType = :articleType', {
        articleType,
      });
    }

    const articles = await queryBuilder.getMany();
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
