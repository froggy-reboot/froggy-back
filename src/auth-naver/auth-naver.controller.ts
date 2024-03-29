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
import { AuthSocialLoginUrlDto } from 'src/auth/dto/auth-social-login.dto';
import { ConfigService } from '@nestjs/config';
@ApiTags('네이버 회원가입')
@Controller({
  path: 'auth/naver',
  version: '1',
})
export class AuthNaverController {
  constructor(
    public authService: AuthService,
    public authNaverService: AuthNaverService,
    private configService: ConfigService,
  ) {}

  @Get('register')
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'naver 로그인 창 url을 보내줍니다.',
  })
  @HttpCode(HttpStatus.CREATED)
  register() {
    const redirectUrl = this.authNaverService.getRedirectUrl();
    return redirectUrl;
  }

  @Get('callback')
  @UseGuards(AuthGuard('naver'))
  async callback(@Req() req, @Res() res) {
    // console.log(req.user);
    const socialData: SocialInterface = {
      enrollType: enrollType.naver,
      email: req.user.email,
      password: null,
    };
    console.log(socialData);

    const userId = await this.authService.findOrCreateUser(socialData);
    const frontUrl = this.configService.get('FRONTEND_DOMAIN');
    res.redirect(`${frontUrl}/sign-in/social/${userId}`);
  }
}
