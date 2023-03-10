import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { customBool, enrollType, User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {
  AuthEmailLoginDto,
  AuthEmailLoginResDto,
} from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as crypto from 'crypto';
import { plainToClass } from 'class-transformer';
import { Status } from 'src/statuses/entities/status.entity';
import { Role } from 'src/roles/entities/role.entity';
import { AuthProvidersEnum } from './auth-providers.enum';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UsersService } from 'src/users/users.service';
import { ShowUserDto } from 'src/users/dto/show-user.dto';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { AuthRefreshResDto } from './dto/auth-refresh.dto';
// import { ForgotService } from 'src/forgot/forgot.service';
// import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService, // private forgotService: ForgotService, // private mailService: MailService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<AuthEmailLoginResDto> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
      enroll_type: enrollType.local,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.is_certified === 'N') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          errors: {
            email: 'uncertified',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const { token, refreshToken } = await this.getTokens(user.id);

      await this.usersService.update(user.id, { refreshToken: refreshToken });

      return { token, refreshToken, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async saveRavelryUser() {
    // 1. ???????????? ?????? ?????? ?????? ??????
    // 2. ?????? ????????? ?????? ??? ??????
    // 3. ?????? ?????? userId ??????
  }

  async linkRavelryUser() {
    // 1. ???????????? user id ??? user jwt token ??????
  }

  async updateRefreshToken(userId, refreshToken: string) {
    await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }

  async validateSocialLogin(
    socialData: SocialInterface,
  ): Promise<{ userId: number }> {
    let user: User;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersService.findOne({
      email: socialEmail,
      enroll_type: socialData.enroll_type,
    });

    let userId;
    if (!userByEmail) {
      const createdSocialUser = await this.createSocialUser(socialData);
      userId = createdSocialUser.id;
    } else {
      userId = userByEmail.id;
    }
    return userId;
  }

  async genJwtToken(userByEmail, socialData) {
    if (userByEmail.enroll_type === socialData.enroll_type) {
      const jwtToken = await this.jwtService.sign({
        id: userByEmail.id,
      });
      return jwtToken;
    } else {
      //TODO: ????????? ?????? ????????? ??????
    }
  }

  async getTokens(userId: number) {
    const token = await this.jwtService.sign(
      {
        id: userId,
      },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN')}`,
      },
    );

    const refreshToken = await this.jwtService.sign(
      {
        id: userId,
      },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'AUTH_JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        )}`,
      },
    );

    const hashedRefreshToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    return { token, refreshToken: hashedRefreshToken };
  }

  async createSocialUser(socialData): Promise<User> {
    const randomNickname = await this.getUniqueNickName();
    const createUserResult = await this.usersService.create({
      email: socialData.email,
      password: socialData.password,
      enroll_type: socialData.enroll_type,
      nickname: randomNickname,
    });

    const user = await this.usersService.findOne({
      id: createUserResult.id,
    });

    return user;
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const hash = await bcrypt.hash(dto.password, 15);
    const exUser = await this.usersService.findOne({
      email: dto.email,
    });
    if (exUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `email already exist`,
        },
        HttpStatus.CONFLICT,
      );
    }

    const hash4MailCertify = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.create({
      email: dto.email,
      enroll_type: dto.enroll_type,
      password: hash,
      nickname: dto.nickname,
      certify_hash: hash4MailCertify,
    });

    await this.mailService.userSignUp({
      to: user.email,
      data: {
        hash: hash4MailCertify,
      },
    });
    return;
  }

  async getAccessTokenAndUserById(userId) {
    const user = await this.usersService.findOne({
      id: userId,
    });

    const jwtToken = await this.jwtService.sign({
      user: user,
    });

    return {
      jwtToken,
      user,
    };
  }

  async checkExistEmail(dto) {
    const userByEmail = await this.usersService.findOne({
      email: dto.email,
    });

    if (userByEmail) {
      return true;
    } else {
      return false;
    }
  }

  async getUniqueNickName(): Promise<string> {
    let uniqueNickname;
    while (true) {
      const tmpNickname = this.genRandomNickName();
      const user = await this.usersService.findOne({
        nickname: tmpNickname,
      });
      if (!user) {
        uniqueNickname = tmpNickname;
        break;
      }
    }
    return uniqueNickname;
  }

  genRandomNickName(): string {
    const adjective = this.getAdjectives();
    const noun = this.getNoun();
    const number = this.getRandomNumber(1, 999);

    return `${adjective}${noun}${number}`;
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOne({
      certify_hash: hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.usersService.update(user.id, { isCertified: customBool.Y });
    return;
  }

  async logout(user) {
    await this.usersService.update(user.id, { refreshToken: '' });
  }

  async getUserByRefreshToken(refreshToken: string): Promise<User> {
    const user = await this.usersService.findOne({
      refreshToken,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async refreshJwtToken(refreshToken: string): Promise<AuthRefreshResDto> {
    const user = await this.getUserByRefreshToken(refreshToken);
    const { token, refreshToken: newRefreshToken } = await this.getTokens(
      user.id,
    );

    await this.usersService.update(user.id, {
      refreshToken: newRefreshToken,
    });

    return { token: token, refreshToken: newRefreshToken };
  }

  // async forgotPassword(email: string): Promise<void> {
  //   const user = await this.usersService.findOne({
  //     email,
  //   });

  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           email: 'emailNotExists',
  //         },
  //       },
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   } else {
  //     const hash = crypto
  //       .createHash('sha256')
  //       .update(randomStringGenerator())
  //       .digest('hex');
  //     await this.forgotService.create({
  //       hash,
  //       user,
  //     });

  //     await this.mailService.forgotPassword({
  //       to: email,
  //       data: {
  //         hash,
  //       },
  //     });
  //   }
  // }

  // async resetPassword(hash: string, password: string): Promise<void> {
  //   const forgot = await this.forgotService.findOne({
  //     where: {
  //       hash,
  //     },
  //   });

  //   if (!forgot) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           hash: `notFound`,
  //         },
  //       },
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   const user = forgot.user;
  //   user.password = password;
  //   await user.save();
  //   await this.forgotService.softDelete(forgot.id);
  // }

  // async me(user: User): Promise<User> {
  //   return this.usersService.findOne({
  //     id: user.id,
  //   });
  // }

  // async update(user: User, userDto: AuthUpdateDto): Promise<User> {
  //   if (userDto.password) {
  //     if (userDto.oldPassword) {
  //       const currentUser = await this.usersService.findOne({
  //         id: user.id,
  //       });

  //       const isValidOldPassword = await bcrypt.compare(
  //         userDto.oldPassword,
  //         currentUser.password,
  //       );

  //       if (!isValidOldPassword) {
  //         throw new HttpException(
  //           {
  //             status: HttpStatus.UNPROCESSABLE_ENTITY,
  //             errors: {
  //               oldPassword: 'incorrectOldPassword',
  //             },
  //           },
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //       }
  //     } else {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.UNPROCESSABLE_ENTITY,
  //           errors: {
  //             oldPassword: 'missingOldPassword',
  //           },
  //         },
  //         HttpStatus.UNPROCESSABLE_ENTITY,
  //       );
  //     }
  //   }

  //   await this.usersService.update(user.id, userDto);

  //   return this.usersService.findOne({
  //     id: user.id,
  //   });
  // }

  // async softDelete(user: User): Promise<void> {
  //   await this.usersService.softDelete(user.id);
  // }

  getNoun() {
    const nouns = [
      '??????',
      '?????????',
      '??????',
      '??????',
      '?????????',
      '??????',
      '??????',
      '??????',
      '????????????',
      '?????????',
      '?????????',
      '?????????',
      '??????',
      '??????',
      '??????',
      '???',
      '??????',
      '??????',
      '?????????',
      '??????',
      '??????',
      '??????',
      '?????????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '?????????',
      '?????????',
      '?????????',
      '??????',
      '?????????',
      '????????????',
      '?????????',
      '??????',
      '?????????',
      '?????????',
      '??????',
      '??????',
      '??????',
      '??????',
      '??????',
      '????????????',
      '???',
    ];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return noun;
  }
  getAdjectives() {
    const adjectives = [
      '??????',
      '?????????',
      '????????????',
      '??????',
      '?????????',
      '??????',
      '????????????',
      '??????',
      '??????',
      '?????????',
      '?????????',
      '??????',
      '??????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '??????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
      '?????????',
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    return adjective;
  }
}
