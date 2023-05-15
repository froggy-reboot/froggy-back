import { Injectable } from '@nestjs/common';
import { PatternsService } from 'src/patterns/patterns.service';
import { ThreadsService } from './threads/threads.service';

@Injectable()
export class ThreadTabService {
  constructor(
    private readonly patternService: PatternsService,
    private readonly threadService: ThreadsService,
  ) {}

  async createThread(createThreadReqDto, user, files) {
    // 1. 패턴 생성 또는 조회
    const createPatternDto = {
      ravelryPatternId: createThreadReqDto.ravelryPatternId,
      name: createThreadReqDto.patternName,
    };
    const pattern = await this.patternService.findOrCreatePattern(
      createPatternDto,
    );

    // 2. 스레드 생성
    const createThreadDto = {
      writerId: user.id,
      patternId: pattern.id,
      liked: 0,
      content: createThreadReqDto.content,
    };
    const thread = await this.threadService.create(createThreadDto, files);

    return thread;
  }

  async getThreadsByPatternId(paginationOptions) {
    const threads = await this.threadService.findManyByPatternIdWitPagination(
      paginationOptions,
    );
    return threads;
  }
}
