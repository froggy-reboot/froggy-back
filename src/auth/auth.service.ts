import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { enrollType, User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
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
// import { ForgotService } from 'src/forgot/forgot.service';
// import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService, // private forgotService: ForgotService, // private mailService: MailService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
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

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id,
      });
      return { token, user: user };
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

  async validateSocialLogin(
    socialData: SocialInterface,
  ): Promise<{ token: string; user: User }> {
    let user: User;
    const socialEmail = socialData.email?.toLowerCase();

    const userByEmail = await this.usersService.findOne({
      email: socialEmail,
    });

    let jwtToken;
    if (userByEmail) {
      jwtToken = this.genJwtToken(userByEmail, socialData);
    } else {
      jwtToken = await this.createUserAndGenJwtToken(socialData);
    }
    return {
      token: jwtToken,
      user,
    };
  }

  async genJwtToken(userByEmail, socialData) {
    if (userByEmail.enroll_type === socialData.enroll_type) {
      const jwtToken = await this.jwtService.sign({
        user: userByEmail,
      });
      return jwtToken;
    } else {
      //TODO: 소셜과 일반 로그인 연동
    }
  }

  async createUserAndGenJwtToken(socialData): Promise<string> {
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

    const jwtToken = await this.jwtService.sign({
      user: user,
    });
    return jwtToken;
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

    const user = await this.usersService.create({
      email: dto.email,
      enroll_type: dto.enroll_type,
      password: hash,
      nickname: dto.nickname,
    });
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

  getNoun() {
    const nouns = [
      '사과',
      '바나나',
      '딸기',
      '개미',
      '코끼리',
      '여우',
      '기린',
      '하마',
      '이구아나',
      '해파리',
      '개구리',
      '복숭아',
      '돼지',
      '연꽃',
      '치즈',
      '곰',
      '통닭',
    ];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return noun;
  }
  getAdjectives() {
    const adjectives = [
      '멋진',
      '미친',
      '즐거운',
      '성격급한',
      '졸린',
      '심심한',
      '화난',
      '여유로운',
      '노란',
      '붉은',
      '감동한',
      '우울한',
      '바쁜',
      '들뜬',
      '굶주린',
      '무던한',
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    return adjective;
  }

  // async confirmEmail(hash: string): Promise<void> {
  //   const user = await this.usersService.findOne({
  //     hash,
  //   });

  //   if (!user) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         error: `notFound`,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   user.hash = null;
  //   user.status = plainToClass(Status, {
  //     id: StatusEnum.active,
  //   });
  //   await user.save();
  // }

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
}
