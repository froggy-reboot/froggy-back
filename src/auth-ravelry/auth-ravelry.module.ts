import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRavelryController } from './auth-ravelry.controller';
import { AuthRavelryService } from './auth-ravelry.service';
import { HttpModule } from '@nestjs/axios';
import { RavelryUsersModule } from 'src/ravelry-users/ravelry-users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    HttpModule,
    RavelryUsersModule,
    UsersModule,
  ],
  controllers: [AuthRavelryController],
  providers: [AuthRavelryService],
  exports: [AuthRavelryService],
})
export class AuthRavelryModule {}
