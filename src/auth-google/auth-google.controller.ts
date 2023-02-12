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
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

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
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  register(@Body() loginDto: AuthGoogleLoginDto) {
    const socialData = this.authGoogleService.getProfileByToken(loginDto);

    // return this.authService.validateSocialLogin('google', socialData);
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    // const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    res.redirect('http://localhost:4000');
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: AuthGoogleLoginDto) {
  //   const socialData = await this.authGoogleService.getProfileByToken(loginDto);

  //   return this.authService.validateSocialLogin('google', socialData);
  // }
}
