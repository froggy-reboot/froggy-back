import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
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
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  async register(@Req() req, @Res() res) {
    const authorizationUri = await this.authRaverlyService.getRedirectUrl();
    res.redirect(authorizationUri);
  }

  @Get('callback')
  async callback(@Req() req, @Res() res) {
    // const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    res.redirect('http://localhost:4000');
  }
}
