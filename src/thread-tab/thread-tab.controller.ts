import { Controller } from '@nestjs/common';
import { ThreadTabService } from './thread-tab.service';

@Controller('thread')
export class ThreadTabController {
  constructor(private readonly threadTabService: ThreadTabService) {}
}
