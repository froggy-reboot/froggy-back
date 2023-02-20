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
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  async register(@Req() req, @Res() res) {
    const authorizationUri = await this.authRaverlyService.getRedirectUrl();
    res.redirect(authorizationUri);
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    // const config = {
    //   client: {
    //     id: process.env.RAVELRY_CLIENT_ID,
    //     secret: process.env.RAVELRY_CLIENT_SECRET,
    //   },
    //   auth: {
    //     tokenHost: 'https://www.ravelry.com/',
    //     tokenPath: 'oauth2/token',
    //     authorizePath: 'oauth2/auth',
    //   },
    // };

    // const tokenParams = {
    //   code: '<code>',
    //   redirect_uri: process.env.RAVELRY_CALL_BACK_URL,
    //   scope: '[profile-only]',
    // };

    // const httpOptions = {};

    // const client = new AuthorizationCode(config);
    // const accessToken = await client.getToken(tokenParams, httpOptions);

    // const socialData: SocialInterface = {
    //   enroll_type: <enrollType>'raverly',
    //   email: req.user.email,
    //   password: null,
    // };
    // await this.authService.validateSocialLogin(socialData);
    // const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    res.redirect('http://localhost:4000');
  }
}
