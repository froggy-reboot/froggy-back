import { Module } from '@nestjs/common';
import { AuthKakaoService } from './auth-kakao.service';
import { KakaoStrategy } from 'src/auth-kakao/kakao.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthKakaoController } from './auth-kakao.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthKakaoService, KakaoStrategy],
  exports: [AuthKakaoService],
  controllers: [AuthKakaoController],
})
export class AuthKakaoModule {}
