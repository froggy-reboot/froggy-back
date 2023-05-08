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
    const createPatternDto = {
      ravelryPatternId: createThreadReqDto.ravelryPatternId,
      name: createThreadReqDto.patternName,
    };
    const pattern = await this.patternService.findOrCreatePattern(
      createPatternDto,
    );

    const createThreadDto = {
      writerId: user.id,
      patternId: pattern.id,
      liked: 0,
      content: createThreadReqDto.content,
      order: 0,
    };
    const thread = await this.threadService.create(createThreadDto);
    return thread;
  }
}
