import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticleImagesService } from 'src/article-images/article-images.service';
import { CreateArticleImageDto } from 'src/article-images/dto/create-article-image.dto';
import { Comment } from '../comments/entities/comment.entity';
import { ArticlesRepository } from './repository/article.repository';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private articleCustomRepository: ArticlesRepository,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private articleImagesService: ArticleImagesService,
  ) {}
  async create(createArticleDto: CreateArticleDto, files) {
    const result = await this.articleRepository.save(
      this.articleRepository.create(createArticleDto),
    );
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const createArticleImageDto: CreateArticleImageDto = {
          articleId: result.id,
          order: i + 1,
          url: files[i].location,
        };
        await this.articleImagesService.create(createArticleImageDto);
      }
    }
    return result;
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.articleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit, // offset
      take: paginationOptions.limit, // limit
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.save(
      this.articleRepository.create({
        id,
        ...updateArticleDto,
      }),
    );
  }

  async updateLikeCount(id: number, type: string) {
    if (type === 'sub') {
      const article = await this.articleCustomRepository.subLikeCount(id);
      return article;
    } else if (type === 'add') {
      const article = await this.articleCustomRepository.addLikeCount(id);
      return article;
    }
  }

  remove(id: number) {
    // 아래 방법으로는 댓글까지 soft delete가 안됨
    // return this.articleRepository.softDelete({ id });
    const comments = this.commentRepository.softDelete({
      articleId: id,
    });
    return this.articleRepository.softDelete({ id });
  }
}
