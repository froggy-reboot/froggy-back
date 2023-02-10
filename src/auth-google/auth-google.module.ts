import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGoogleController } from './auth-google.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [AuthGoogleService, GoogleStrategy],
  exports: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
