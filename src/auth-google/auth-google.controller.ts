import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from '../social/interfaces/social.interface';
import { enrollType } from '../users/entities/user.entity';
import { AuthSocialLoginUrlDto } from 'src/auth/dto/auth-social-login.dto';

@ApiTags('구글 회원가입')
@Controller({
  path: 'auth/google',
  version: '1',
})
export class AuthGoogleController {
  constructor(
    public authService: AuthService,
    public authGoogleService: AuthGoogleService,
  ) {}

  @Get('register')
  @ApiResponse({
    status: 301,
    type: AuthSocialLoginUrlDto,
    description: 'google 로그인 창 url을 보내줍니다.',
  })
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  getRegister() {
    const redirectUrl = this.authGoogleService.getRedirectUrl();
    return redirectUrl;
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    const socialData: SocialInterface = {
      enrollType: enrollType.google,
      email: req.user.email,
      password: null,
    };

    const userId = await this.authService.findOrCreateUser(socialData);
    res.redirect(`http://localhost:3000/sign-in/social/${userId}`);
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: AuthGoogleLoginDto) {
  //   const socialData = await this.authGoogleService.getProfileByToken(loginDto);

  //   return this.authService.validateSocialLogin('google', socialData);
  // }
}
