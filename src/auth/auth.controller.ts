import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
  Query,
  Param,
  Req,
  Res,
  Render,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthEmailLoginDto,
  AuthEmailLoginResDto,
} from './dto/auth-email-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import {
  AuthCheckIsExistEmailDto,
  AuthCheckIsExistEmailResDto,
} from './dto/auth-email-isExist.dto';
import { AuthRandomNickNameResDto } from './dto/auth-random-nickname.dto';
import {
  AuthSocialLoginIngDto,
  AuthSocialLoginResDto,
} from './dto/auth-social-login.dto';
import { AuthRefreshDto, AuthRefreshResDto } from './dto/auth-refresh.dto';

@ApiTags('로컬 회원가입')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    return this.service.register(createUserDto);
  }

  @Post('email/login')
  @ApiResponse({
    status: 200,
    type: AuthEmailLoginResDto,
    description: '로그인 성공',
  })
  @ApiResponse({
    status: 422,
    description: '회원가입 되지 않은 이메일 또는 비밀번호 오류',
  })
  @ApiResponse({ status: 401, description: '인증되지 않은 이메일' })
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthEmailLoginDto) {
    return this.service.validateLogin(loginDto);
  }

  @Post('email/isexist')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '이미 존재하는 이메일: Y, 존재하지 않는 이메일:N ',
    type: AuthCheckIsExistEmailResDto,
  })
  public async checkIsEmailExist(
    @Body() checkEmailDto: AuthCheckIsExistEmailDto,
  ) {
    const checkResult = await this.service.checkExistEmail(checkEmailDto);
    const resJson = {
      isExistEmail: checkResult ? 'Y' : 'N',
    };
    return resJson;
  }

  @Get('email/confirm/:hash')
  @Render('certify-complete')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Param('hash') hash, @Req() req, @Res() res) {
    await this.service.confirmEmail(hash);
    return;
  }

  @Get('random-nickname')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: AuthRandomNickNameResDto,
    description: '랜덤 닉네임 조회 완료',
  })
  public async getRandomNickname(): Promise<AuthRandomNickNameResDto> {
    const nickname = await this.service.getUniqueNickName();
    const resJson = { nickname };
    return resJson;
  }

  @Post('social/login')
  @ApiResponse({
    status: 200,
    type: AuthSocialLoginResDto,
    description: '소셜 로그인 로그인 로직',
  })
  public async socialLogin(
    @Body() authSocialLoginIngDto: AuthSocialLoginIngDto,
  ) {
    console.log('body dto', authSocialLoginIngDto.userId);

    const getUserAuthInfoByUserIdResult =
      await this.service.getUserAuthInfoByUserId(authSocialLoginIngDto.userId);

    const { token, refreshToken, user } = getUserAuthInfoByUserIdResult;
    const resJson: AuthSocialLoginResDto = {
      jwtToken: token,
      refreshToken,
      user: user,
    };

    return resJson;
  }

  @Post('refresh')
  @ApiResponse({
    status: 200,
    type: AuthRefreshResDto,
    description: 'refresh token을 이용하여 jwt token 발급',
  })
  @ApiResponse({
    status: 404,
    description: 'refresh token이 유효하지 않음',
  })
  async refresh(@Body() refreshDto: AuthRefreshDto) {
    return this.service.refreshJwtToken(refreshDto.refreshToken);
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @ApiResponse({
    status: 401,
    description: 'access token이 없거나 유효하지 않습니다.',
  })
  logout(@Request() req) {
    return this.service.logout(req.user);
  }

  // @Post('forgot/password')
  // @HttpCode(HttpStatus.OK)
  // async forgotPassword(@Body() forgotPasswordDto: AuthForgotPasswordDto) {
  //   return this.service.forgotPassword(forgotPasswordDto.email);
  // }

  // @Post('reset/password')
  // @HttpCode(HttpStatus.OK)
  // async resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto) {
  //   return this.service.resetPassword(
  //     resetPasswordDto.hash,
  //     resetPasswordDto.password,
  //   );
  // }

  // @ApiBearerAuth()
  // @SerializeOptions({
  //   groups: ['me'],
  // })
  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public async me(@Request() request) {
  //   return this.service.me(request.user);
  // }

  // @ApiBearerAuth()
  // @SerializeOptions({
  //   groups: ['me'],
  // })
  // @Patch('me')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public async update(@Request() request, @Body() userDto: AuthUpdateDto) {
  //   return this.service.update(request.user, userDto);
  // }

  // @ApiBearerAuth()
  // @Delete('me')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public async delete(@Request() request) {
  //   return this.service.softDelete(request.user);
  // }
}
