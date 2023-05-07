import { Module } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { PatternsController } from './patterns.controller';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';

@Module({
  controllers: [PatternsController],
  providers: [PatternsService, RavelryApiService],
})
export class PatternsModule {}
