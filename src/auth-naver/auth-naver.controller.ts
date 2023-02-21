import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthNaverService } from './auth-naver.service';
import { AuthNaverLoginDto } from './dto/auth-naver-login.dto';
import { SocialInterface } from '../social/interfaces/social.interface';
import { enrollType } from '../users/entities/user.entity';

@ApiTags('네이버 회원가입')
@Controller({
  path: 'auth/naver',
  version: '1',
})
export class AuthNaverController {
  constructor(
    public authService: AuthService,
    public authNaverService: AuthNaverService,
  ) {}

  @Get('register')
  @UseGuards(AuthGuard('naver'))
  @HttpCode(HttpStatus.CREATED)
  register() {
    // const socialData = this.authNaverService.getProfileByToken(loginDto);
    // return this.authService.validateSocialLogin('google', socialData);
  }

  @Get('callback')
  @UseGuards(AuthGuard('naver'))
  async callback(@Req() req, @Res() res) {
    // console.log(req.user);
    const socialData: SocialInterface = {
      enroll_type: enrollType.naver,
      email: req.user.email,
      password: null,
    };
    console.log(socialData);

    await this.authService.validateSocialLogin(socialData);
    res.redirect('http://localhost:4000');
  }
}
