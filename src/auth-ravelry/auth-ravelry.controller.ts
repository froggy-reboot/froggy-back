import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthSocialLoginUrlDto } from 'src/auth/dto/auth-social-login.dto';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { enrollType } from 'src/users/entities/user.entity';
import { AuthRavelryService } from './auth-ravelry.service';

@ApiTags('ravelry 회원가입')
@Controller({
  path: 'auth/ravelry',
  version: '1',
})
export class AuthRavelryController {
  constructor(
    public authService: AuthService,
    public authRaverlyService: AuthRavelryService,
  ) {}

  @Get('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry 로그인 창 url을 보내줍니다.',
  })
  async register(@Req() req, @Res() res) {
    const authorizationUri = await this.authRaverlyService.getRedirectUrl();
    return authorizationUri;
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    const accessToken = await this.authRaverlyService.getAccessToken(req);

    const raverlyUserInfo =
      await this.authRaverlyService.getUserInfoByAccessToken(accessToken);

    const socialData: SocialInterface = this.authRaverlyService.genSocialData(
      raverlyUserInfo,
      accessToken,
    );

    const userId = await this.authService.validateSocialLogin(socialData);
    res.redirect(`http://localhost:3000/sign-in/social/${userId}`);
  }
}
