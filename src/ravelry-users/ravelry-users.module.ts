import { Module } from '@nestjs/common';
import { RavelryUsersService } from './ravelry-users.service';
import { RavelryUsersController } from './ravelry-users.controller';
import { RavelryUser } from './entities/ravelry-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RavelryUser])],
  controllers: [RavelryUsersController],
  providers: [RavelryUsersService],
  exports: [RavelryUsersService],
})
export class RavelryUsersModule {}
