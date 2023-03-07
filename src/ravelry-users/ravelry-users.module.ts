import { Module } from '@nestjs/common';
import { RavelryUsersService } from './ravelry-users.service';
import { RavelryUsersController } from './ravelry-users.controller';

@Module({
  controllers: [RavelryUsersController],
  providers: [RavelryUsersService]
})
export class RavelryUsersModule {}
