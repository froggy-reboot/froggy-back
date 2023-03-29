import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthSocialLoginUrlDto } from 'src/auth/dto/auth-social-login.dto';
import { SocialInterface } from 'src/social/interfaces/social.interface';
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
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @ApiResponse({
    status: 301,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry 로그인 창 url을 보내줍니다.',
  })
  async register() {
    const authorizationUri = await this.authRavelryService.getRedirectUrl();
    return authorizationUri;
  }

  @Get('redirect-url')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description:
      'Ravelry 로그인 창 url을 보내줍니다. 인증을 마치면 http://localhost:3000/sign-in/social/${userId}으로 리다이렉트 됩니다.',
  })
  async getRedirectUrl(@Req() req, @Res() res) {
    const authorizationUri = await this.authRavelryService.getRedirectUrl();
    return authorizationUri;
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    const accessToken = await this.authRavelryService.getAccessToken(req);

    const ravelryUserInfo =
      await this.authRavelryService.getUserInfoByAccessToken(accessToken);
    console.log('ravelryUserInfoTest', ravelryUserInfo);

    const ravelryUser = await this.authRavelryService.findOrCreateRavelryUser(
      ravelryUserInfo,
      accessToken,
    );
    console.log('ravelryUserTest', ravelryUser);

    const socialData: SocialInterface =
      this.authRavelryService.genSocialData(ravelryUser);

    console.log('socialDataTest', socialData);
    const userId = await this.authService.findOrCreateUserByRavelryUserId(
      ravelryUser,
      socialData,
    );
    res.redirect(`http://localhost:3000/sign-in/social/${userId}`);
  }

  @Get('test')
  async test(@Body('ravelryId') ravelryId: string) {
    const ravelryUserInfo = { id: ravelryId };
    const ravelryUser = await this.authRavelryService.findOrCreateRavelryUser(
      ravelryUserInfo,
      'ddd',
    );

    const socialData: SocialInterface =
      this.authRavelryService.genSocialData(ravelryUser);

    const userId = await this.authService.findOrCreateUserByRavelryUserId(
      ravelryUser,
      socialData,
    );
  }

  @Get('link/callback')
  async linkCallback(@Req() req, @Res() res) {
    // const accessToken = await this.authRavelryService.getAccessToken(req);
    // const ravelryUserInfo =
    //   await this.authRavelryService.getUserInfoByAccessToken(accessToken);
    // await this.authRavelryService.saveAuthRavelryUser(
    //   ravelryUserInfo,
    //   accessToken,
    // );
    // const socialData: SocialInterface = this.authRavelryService.genSocialData(
    //   ravelryUserInfo,
    //   accessToken,
    // );
    // // const userId = await this.authService.findOrCreateUserByRavelryUserId(
    // //   socialData,
    // // );
    // res.redirect(`http://localhost:3000/sign-in/ravelry/${userId}`);
  }

  @Post('link')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginUrlDto,
    description: 'Ravelry계정과 계정을 연동해 줍니다.',
  })
  @ApiResponse({
    status: 401,
    description: 'access token이 없거나 유효하지 않습니다.',
  })
  @HttpCode(HttpStatus.OK)
  async linkRavelryToAnotherAccount(
    @Request() req,
    @Body() dto: AuthRavelryLoginDto,
  ) {
    await this.authRavelryService.linkRavelryToAnotherAccount(req.user, dto);
  }
}
