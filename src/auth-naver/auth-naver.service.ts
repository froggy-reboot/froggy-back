import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthNaverLoginDto } from './dto/auth-naver-login.dto';

@Injectable()
export class AuthNaverService {
  private naver: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.naver = new OAuth2Client(
      configService.get('naver.clientId'),
      configService.get('naver.clientSecret'),
    );
  }

  async getProfileByToken(
    loginDto: AuthNaverLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.naver.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [this.configService.get('naver.clientId')],
    });

    const data = ticket.getPayload();

    return {
      id: data.sub,
      email: data.email,
    };
  }
}
