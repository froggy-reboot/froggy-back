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
import { AuthSocialLoginUrlDto } from 'src/auth/dto/auth-social-login.dto';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { enrollType } from 'src/users/entities/user.entity';
import { AuthKakaoService } from './auth-kakao.service';
import { AuthKakaoLoginDto } from './dto/auth-kakao-login.dto';

@ApiTags('카카오 회원가입')
@Controller({
  path: 'auth/kakao',
  version: '1',
})
export class AuthKakaoController {
  constructor(
    public authService: AuthService,
    public authKakaoService: AuthKakaoService,
  ) {}

  @Get('register')
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'kakao 로그인 창 url을 보내줍니다.',
  })
  @HttpCode(HttpStatus.CREATED)
  register() {
    const redirectUrl = this.authKakaoService.getRedirectUrl();
    return redirectUrl;
  }

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  async callback(@Req() req, @Res() res) {
    // console.log(req.user);
    const socialData: SocialInterface = {
      enrollType: enrollType.kakao,
      email: req.user.email,
      password: null,
    };

    const userId = await this.authService.findOrCreateUser(socialData);
    res.redirect(`http://localhost:3000/sign-in/social/${userId}`);
  }
}
