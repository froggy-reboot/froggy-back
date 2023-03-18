import { Injectable } from '@nestjs/common';
import { CreateCommentImageDto } from './dto/create-comment-image.dto';
import { UpdateCommentImageDto } from './dto/update-comment-image.dto';

@Injectable()
export class CommentImagesService {
  create(createCommentImageDto: CreateCommentImageDto) {
    return 'This action adds a new commentImage';
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
