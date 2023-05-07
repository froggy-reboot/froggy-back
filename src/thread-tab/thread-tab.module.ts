import { Module } from '@nestjs/common';
import { ThreadTabService } from './thread-tab.service';
import { ThreadTabController } from './thread-tab.controller';

@Module({
  controllers: [ThreadTabController],
  providers: [ThreadTabService]
})
export class ThreadTabModule {}
