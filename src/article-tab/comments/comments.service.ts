import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { CommentImagesService } from 'src/article-tab/comment-images/comment-images.service';
import { CreateCommentImageDto } from 'src/article-tab/comment-images/dto/create-comment-image.dto';
import { ArticlesService } from 'src/article-tab/articles/services/articles.service';
import { ArticlesReadService } from '../articles/services/articles.read.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private articleService: ArticlesService,
    private articlesReadService: ArticlesReadService,
    private commentImagesService: CommentImagesService,
  ) {}
  async create(createCommentDto: CreateCommentDto, file) {
    const targetArticle = await this.articlesReadService.findOne(
      createCommentDto.articleId,
    );
    if (!targetArticle) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            message: '해당 게시글이 존재하지 않습니다.',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createCommentResult = await this.commentRepository.save(
      this.commentRepository.create(createCommentDto),
    );

    if (file) {
      const createCommentImageDto: CreateCommentImageDto = {
        commentId: createCommentResult.id,
        url: file.location,
      };
      await this.commentImagesService.create(createCommentImageDto);
    }
    return createCommentResult;
  }

  findByArticleId(articleId: number, paginationOptions: IPaginationOptions) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .withDeleted()
      .where('comment.articleId = :id', { id: articleId })
      .leftJoin('comment.user', 'user')
      .andWhere('comment.deletedAt is null')
      .select([
        'comment.id',
        'comment.content',
        'comment.createdAt',
        'user.id',
        'user.nickname',
        'user.profileImg',
      ])
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .getMany();
  }

  findAll(articleId: number) {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.save(
      this.commentRepository.create({
        id,
        ...updateCommentDto,
      }),
    );
  }

  remove(id: number) {
    return this.commentRepository.softDelete({ id });
  }

  async findCommentsByMe(paginationOptions, userId) {
    const comments = await this.commentRepository.find({
      where: { writerId: userId },
      skip: (paginationOptions.page - 1) * paginationOptions.limit, // 오프셋
      take: paginationOptions.limit, // 제한
    });

    for (const comment of comments) {
      comment.article = await this.articlesReadService.findOne(
        comment.articleId,
      );
    }
    return comments;
  }
}
