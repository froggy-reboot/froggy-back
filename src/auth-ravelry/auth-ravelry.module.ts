import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRavelryController } from './auth-ravelry.controller';
import { AuthRavelryService } from './auth-ravelry.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, AuthModule, HttpModule],
  controllers: [AuthRavelryController],
  providers: [AuthRavelryService],
})
export class AuthRavelryModule {}
