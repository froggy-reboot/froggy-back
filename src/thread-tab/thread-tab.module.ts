import { Module } from '@nestjs/common';
import { ThreadTabService } from './thread-tab.service';
import { ThreadTabController } from './thread-tab.controller';
import { PatternsService } from 'src/patterns/patterns.service';
import { PatternsModule } from 'src/patterns/patterns.module';
import { ThreadsService } from './threads/threads.service';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';

@Module({
  imports: [PatternsModule],
  controllers: [ThreadTabController],
  providers: [ThreadTabService, ThreadsService],
})
export class ThreadTabModule {}
