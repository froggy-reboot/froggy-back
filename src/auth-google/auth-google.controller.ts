import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { SocialInterface } from '../social/interfaces/social.interface';
import { enrollType } from '../users/entities/user.entity';

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
  getRegister() {
    // const socialData = this.authGoogleService.getProfileByToken(loginDto);
    // console.log(socialData);
    // console.log(loginDto);
    // return this.authService.register(createUserDto);
    // return this.authService.validateSocialLogin('google', socialData);
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    console.log(req.user);
    // const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    const socialData: SocialInterface = {
      enroll_type: enrollType.google,
      email: req.user.email,
      password: null,
    };

    await this.authService.validateSocialLogin(socialData);
    res.redirect('http://localhost:4000');
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: AuthGoogleLoginDto) {
  //   const socialData = await this.authGoogleService.getProfileByToken(loginDto);

  //   return this.authService.validateSocialLogin('google', socialData);
  // }
}
