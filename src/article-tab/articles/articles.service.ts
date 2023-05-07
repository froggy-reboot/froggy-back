import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleReqDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { ArticleImagesService } from 'src/article-tab/article-images/article-images.service';
import { CreateArticleImageDto } from 'src/article-tab/article-images/dto/create-article-image.dto';
import { Comment } from '../comments/entities/comment.entity';
import { ArticlesRepository } from './repository/article.repository';
import { UpdateArticleImageDto } from 'src/article-tab/article-images/dto/update-article-image.dto';

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

  findArticleByMe(paginationOptions: IPaginationOptions, userId) {
    return this.articleRepository.find({
      where: { writerId: userId },
      skip: (paginationOptions.page - 1) * paginationOptions.limit, // offset
      take: paginationOptions.limit, // limit
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateArticleDto: UpdateArticleReqDto, files) {
    const result = await this.articleRepository.save(
      this.articleRepository.create({
        id,
        ...updateArticleDto,
      }),
    );
    const photoOrderList = JSON.parse(updateArticleDto.photoOrderList);

    let fileIdx = 0;
    for (const index in photoOrderList) {
      const photoOrder = photoOrderList[index];
      if (photoOrder.type === 'new') {
        const createArticleImageDto: CreateArticleImageDto = {
          articleId: id,
          order: parseInt(index) + 1,
          url: files[fileIdx].location,
        };
        await this.articleImagesService.create(createArticleImageDto);
        fileIdx += 1;
      } else if (photoOrder.type === 'existing') {
        const updateArticleImageDto: UpdateArticleImageDto = {
          order: parseInt(index) + 1,
        };
        await this.articleImagesService.update(
          photoOrder.id,
          updateArticleImageDto,
        );
      }
    }

    if (updateArticleDto.deleteImageIdList) {
      await this.articleImagesService.removeMany(
        updateArticleDto.deleteImageIdList,
      );
    }
    return result;
  }

  async updateLikeCount(id: number, type: string) {
    if (type === 'sub') {
      return await this.articleCustomRepository.subLikeCount(id);
    } else if (type === 'add') {
      return await this.articleCustomRepository.addLikeCount(id);
    }
  }

  async remove(id: number) {
    // 아래 방법으로는 댓글까지 soft delete가 안됨
    // return this.articleRepository.softDelete({ id });

    const articleImageList = await this.articleImagesService.findAll(id);
    if (articleImageList.length > 0) {
      const articleImageIdList = articleImageList.map((articleImage) => {
        return articleImage.id;
      });
      const imageRemoveResult =
        this.articleImagesService.removeMany(articleImageIdList);
    }
    const comments = this.commentRepository.softDelete({
      articleId: id,
    });
    return this.articleRepository.softDelete({ id });
  }
}
