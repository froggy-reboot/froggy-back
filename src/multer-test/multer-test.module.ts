import { Module } from '@nestjs/common';
import { MulterTestService } from './multer-test.service';
import { MulterTestController } from './multer-test.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/utils/common/multer.option';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [MulterTestController],
  providers: [MulterTestService],
})
export class MulterTestModule {}
