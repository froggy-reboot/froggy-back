import { Injectable } from '@nestjs/common';
import { PatternsService } from 'src/patterns/patterns.service';
import { ThreadsService } from './threads/threads.service';
import { ThreadPatternIdPaginationReq } from './dto/ThreadPatternIdPaginationReq';
import { ThreadAllPaginationReq } from './dto/ThreadAllPaginationReq';
import { ThreadAllPaginationRes } from './dto/ThreadAllPaginationRes';

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

  async getThreadsByAll(paginationOptions: ThreadAllPaginationReq, userId) {
    const threads = await this.threadService.findAll(paginationOptions, userId);

    // captainKnitter와 knittersCount를 가져오는 비동기 작업
    const captainKnitterPromises = threads.map((thread) =>
      this.threadService.findCaptainKnitter(thread.patternId),
    );
    const knittersCountPromises = threads.map((thread) =>
      this.threadService.findKnittersCount(thread.patternId),
    );

    // 비동기 작업을 병렬로 실행하여 결과를 받아옴
    const captainKnitters = await Promise.all(captainKnitterPromises);
    const knittersCounts = await Promise.all(knittersCountPromises);

    const res: ThreadAllPaginationRes[] = threads.map((thread, index) => ({
      writerId: thread.writerId,
      patternId: thread.patternId,
      captainKnitter: captainKnitters[index],
      knittersCount: knittersCounts[index],
      liked: thread.liked,
      content: thread.content,
      createdAt: thread.createdAt,
    }));

    return res;
  }
}
