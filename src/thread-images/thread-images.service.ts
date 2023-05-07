import { Injectable } from '@nestjs/common';
import { CreateThreadImageDto } from './dto/create-thread-image.dto';
import { UpdateThreadImageDto } from './dto/update-thread-image.dto';

@Injectable()
export class ThreadImagesService {
  create(createThreadImageDto: CreateThreadImageDto) {
    return 'This action adds a new threadImage';
  }

  findAll() {
    return `This action returns all threadImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} threadImage`;
  }

  update(id: number, updateThreadImageDto: UpdateThreadImageDto) {
    return `This action updates a #${id} threadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} threadImage`;
  }
}
