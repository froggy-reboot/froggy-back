import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentImageDto } from './dto/create-comment-image.dto';
import { UpdateCommentImageDto } from './dto/update-comment-image.dto';
import { CommentImage } from './entities/comment-image.entity';

@Injectable()
export class CommentImagesService {
  constructor(
    @InjectRepository(CommentImage)
    private repository: Repository<CommentImage>,
  ) {}

  create(createCommentImageDto: CreateCommentImageDto) {
    return this.repository.save(this.repository.create(createCommentImageDto));
  }

  findAll() {
    return `This action returns all commentImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentImage`;
  }

  update(id: number, updateCommentImageDto: UpdateCommentImageDto) {
    return `This action updates a #${id} commentImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentImage`;
  }
}
