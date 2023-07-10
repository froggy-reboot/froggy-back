import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
import { ThreadImagesService } from '../thread-images/thread-images.service';
import { CreateThreadImageDto } from '../thread-images/dto/create-thread-image.dto';
import { ThreadsRepository } from './repository/thread.repository';
import { ThreadAllPaginationReq } from '../dto/ThreadAllPagination';
import { UsersService } from '../../users/users.service';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadRepository: Repository<Thread>,
    private userService: UsersService,
    private threadCustomRepository: ThreadsRepository,

    private threadImagesService: ThreadImagesService,
  ) {}
  async create(createThreadDto: CreateThreadDto, files) {
    const result = await this.threadRepository.save(
      this.threadRepository.create(createThreadDto),
    );
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const createThreadImageDto: CreateThreadImageDto = {
          threadId: result.id,
          order: i + 1,
          url: files[i].location,
        };
        await this.threadImagesService.create(createThreadImageDto);
      }
    }
    return result;
  }

  async findManyByPatternIdWitPagination(paginationOptions) {
    return this.threadCustomRepository.findManyByPatternIdWitPagination(
      paginationOptions,
    );
  }

  async findAll(paginationOptions: ThreadAllPaginationReq, userId: number) {
    const { page, limit } = paginationOptions;

    return await this.threadRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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

  async findKnittersCount(patternId: number) {
    const thread = this.findOne(patternId);
    if (thread) {
      const knittersCount =
        await this.threadCustomRepository.countDistinctWriters(patternId);
      // console.log(knittersCount);
      return knittersCount;
    }
    return null;
  }
}
