import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CommentImagesService } from 'src/comment-images/comment-images.service';
import { CreateCommentImageDto } from 'src/comment-images/dto/create-comment-image.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    private commentImagesService: CommentImagesService,
  ) {}
  async create(createCommentDto: CreateCommentDto, file) {
    const createCommentResult = await this.commentRepository.save(
      this.commentRepository.create(createCommentDto),
    );

    if (file) {
      const createCommentImageDto: CreateCommentImageDto = {
        commentId: createCommentResult.id,
        url: file.location,
      };
      // this.commentImagesService.create(createCommentImageDto);
    }
    return createCommentResult;
  }

  findByArticleId(articleId: number, paginationOptions: IPaginationOptions) {
    return this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.article_id = :id', { id: articleId })
      .leftJoin('comment.user', 'user')
      .select(['comment.id', 'comment.content', 'user.id', 'user.nickname'])
      .limit(paginationOptions.limit)
      .offset(paginationOptions.limit * (paginationOptions.page - 1))
      .getMany();
  }

  findAll(articleId: number) {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
