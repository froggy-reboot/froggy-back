import { Injectable } from '@nestjs/common';
import { CreateThreadImageDto } from './dto/create-thread-image.dto';
import { UpdateThreadImageDto } from './dto/update-thread-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadImage } from './entities/thread-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadImagesService {
  constructor(
    @InjectRepository(ThreadImage)
    private repository: Repository<ThreadImage>,
  ) {}

  create(createThreadImageDto: CreateThreadImageDto) {
    return this.repository.save(this.repository.create(createThreadImageDto));
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
