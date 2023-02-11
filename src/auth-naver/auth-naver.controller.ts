import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthNaverService } from './auth-naver.service';
import { AuthNaverLoginDto } from './dto/auth-naver-login.dto';

@ApiTags('Auth')
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
  register(@Body() loginDto: AuthNaverLoginDto) {
    const socialData = this.authNaverService.getProfileByToken(loginDto);
    // return this.authService.validateSocialLogin('google', socialData);
  }

  @Get('callback')
  @UseGuards(AuthGuard('naver'))
  async callback(@Req() req, @Res() res) {
    // const socialData = await this.authGoogleService.getProfileByToken(loginDto);

    res.redirect('http://localhost:4000');
  }
}
