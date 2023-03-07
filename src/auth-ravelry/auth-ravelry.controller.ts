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
import { AuthRavelryLoginDto } from './dto/auth-ravelry.dto';

@ApiTags('ravelry 회원가입')
@Controller({
  path: 'auth/ravelry',
  version: '1',
})
export class AuthRavelryController {
  constructor(
    public authService: AuthService,
    public authRavelryService: AuthRavelryService,
  ) {}

  @Get('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry 로그인 창 url을 보내줍니다.',
  })
  async register(@Req() req, @Res() res) {
    const authorizationUri = await this.authRavelryService.getRedirectUrl();
    return authorizationUri;
  }

  @Get('redirect-url')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry 로그인 창 url을 보내줍니다.',
  })
  async getRedirectUrl(@Req() req, @Res() res) {
    const authorizationUri = await this.authRavelryService.getRedirectUrl();
    return authorizationUri;
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    const accessToken = await this.authRavelryService.getAccessToken(req);

    const raverlyUserInfo =
      await this.authRavelryService.getUserInfoByAccessToken(accessToken);

    await this.authRavelryService.saveAuthRavelryUser(
      raverlyUserInfo,
      accessToken,
    );

    const socialData: SocialInterface = this.authRavelryService.genSocialData(
      raverlyUserInfo,
      accessToken,
    );

    const userId = await this.authService.validateSocialLogin(socialData);
    res.redirect(`http://localhost:3000/sign-in/social/${userId}`);
  }

  @Get('link')
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry계정과 계정을 연동해 줍니다.',
  })
  @HttpCode(HttpStatus.OK)
  async linkRavelryToAnotherAccount(@Body() dto: AuthRavelryLoginDto) {
    // await this.authRaverlyService.linkRavelryToAnotherAccount(dto);
  }
}
