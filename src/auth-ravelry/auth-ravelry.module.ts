import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRavelryController } from './auth-ravelry.controller';
import { AuthRavelryService } from './auth-ravelry.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [AuthRavelryController],
  providers: [AuthRavelryService],
})
export class AuthRavelryModule {}
