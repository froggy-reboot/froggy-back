import { Injectable } from '@nestjs/common';
import { CreateThreadCommentDto } from './dto/create-thread-comment.dto';
import { UpdateThreadCommentDto } from './dto/update-thread-comment.dto';

@Injectable()
export class ThreadCommentsService {
  create(createThreadCommentDto: CreateThreadCommentDto) {
    return 'This action adds a new threadComment';
  }

  findAll() {
    return `This action returns all threadComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} threadComment`;
  }

  update(id: number, updateThreadCommentDto: UpdateThreadCommentDto) {
    return `This action updates a #${id} threadComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} threadComment`;
  }
}
