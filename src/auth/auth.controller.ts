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
  NotAcceptableException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import {
  AuthCheckNicknameReqDto,
  AuthCheckNicknameResDto,
  AuthRandomNicknameResDto,
} from './dto/auth-nickname.dto';
import {
  AuthSocialLoginIngDto,
  AuthSocialLoginResDto,
} from './dto/auth-social-login.dto';
import { AuthRefreshDto, AuthRefreshResDto } from './dto/auth-refresh.dto';
import { customBool } from 'src/users/entities/user.entity';
import { AuthWithdrawDto } from './dto/auth-withdraw.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    return this.authService.register(createUserDto);
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
    return this.authService.validateLogin(loginDto);
  }

  @Post('email/isExist')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '이미 존재하는 이메일: Y, 존재하지 않는 이메일:N ',
    type: AuthCheckIsExistEmailResDto,
  })
  public async checkIsEmailExist(
    @Body() checkEmailDto: AuthCheckIsExistEmailDto,
  ) {
    const checkResult = await this.authService.checkExistEmail(checkEmailDto);
    const resJson = {
      isExistEmail: checkResult ? customBool.Y : customBool.N,
    };
    return resJson;
  }

  @Post('nickname/isExist')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '이미 존재하는 닉네임: Y, 존재하지 않는 닉네임:N ',
    type: AuthCheckNicknameResDto,
  })
  public async checkIsNickNameExist(
    @Body() checkEmailDto: AuthCheckNicknameReqDto,
  ) {
    const checkResult = await this.authService.checkExistEmail(checkEmailDto);
    const resJson = {
      isExistNickname: checkResult ? customBool.Y : customBool.N,
    };
    return resJson;
  }

  @Get('email/confirm/:hash')
  @Render('certify-complete')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Param('hash') hash, @Req() req, @Res() res) {
    await this.authService.confirmEmail(hash);
    return;
  }

  @Get('random-nickname')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: AuthRandomNicknameResDto,
    description: '랜덤 닉네임 조회 완료',
  })
  public async getRandomNickname(): Promise<AuthRandomNicknameResDto> {
    const nickname = await this.authService.getUniqueNickName();
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
      await this.authService.getUserAuthInfoByUserId(
        authSocialLoginIngDto.userId,
      );

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
    return this.authService.refreshJwtToken(refreshDto.refreshToken);
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
    return this.authService.logout(req.user);
  }

  @Post('withdraw')
  @ApiOperation({
    summary: '회원 탈퇴',
    description:
      '회원을 탈퇴합니다. 소셜 로그인의 경우 password를 보내지 않아도 됩니다.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: '삭제 성공',
  })
  @ApiResponse({
    status: 422,
    description: '비밀번호가 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 400,
    description: 'jwt의 유저 정보와 삭제를 위한 user 정보가 다른 경우',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않거나, 이미 탈퇴된 유저',
  })
  withdraw(@Request() req, @Body() authWithdrawDto: AuthWithdrawDto) {
    return this.authService.withdraw(req.user.id, authWithdrawDto);
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
