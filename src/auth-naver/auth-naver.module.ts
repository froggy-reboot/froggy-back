import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AuthNaverService } from './auth-naver.service';
import { AuthNaverController } from './auth-naver.controller';
import { NaverStrategy } from './naver.strategy';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthNaverService, NaverStrategy],
  exports: [AuthNaverService],
  controllers: [AuthNaverController],
})
export class AuthNaverModule {}
