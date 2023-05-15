import { Module } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { PatternsController } from './patterns.controller';
import { RavelryApiService } from 'src/utils/api/ravelryApiService';
import { PatternRepository } from './repository/pattern.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pattern } from './entities/pattern.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'aws-sdk';
import { multerOptionsFactory } from 'src/utils/common/multer.option';

@Module({
  imports: [TypeOrmModule.forFeature([Pattern])],
  controllers: [PatternsController],
  providers: [PatternsService, PatternRepository, RavelryApiService],
  exports: [PatternsService],
})
export class PatternsModule {}
