import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { ThreadImagesService } from '../thread-images/thread-images.service';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadRepository: Repository<Thread>,
    private threadImagesService: ThreadImagesService,
  ) {}
  async create(createThreadDto: CreateThreadDto, files) {
    const result = await this.threadRepository.save(
      this.threadRepository.create(createThreadDto),
    );
    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     const createArticleImageDto: CreateThreadImageDto = {
    //       articleId: result.id,
    //       order: i + 1,
    //       url: files[i].location,
    //     };
    //     await this.articleImagesService.create(createArticleImageDto);
    //   }
    // }
    return result;
  }

  findAll() {
    return `This action returns all threads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}
