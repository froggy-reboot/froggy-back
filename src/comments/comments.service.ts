import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CommentImagesService } from 'src/comment-images/comment-images.service';
import { CreateCommentImageDto } from 'src/comment-images/dto/create-comment-image.dto';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private articleService: ArticlesService,
    private commentImagesService: CommentImagesService,
  ) {}
  async create(createCommentDto: CreateCommentDto, file) {
    const targetArticle = await this.articleService.findOne(
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
      .where('comment.articleId = :id', { id: articleId })
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.images', 'image')
      .select([
        'comment.id',
        'comment.content',
        'user.id',
        'user.nickname',
        'user.profileImg',
        'image.url',
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
}
