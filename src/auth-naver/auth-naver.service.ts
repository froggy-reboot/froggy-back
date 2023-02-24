import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthNaverLoginDto } from './dto/auth-naver-login.dto';
import { enrollType } from '../users/entities/user.entity';

@Injectable()
export class AuthNaverService {
  constructor(private configService: ConfigService) {}

  getRedirectUrl(): string {
    const callbackUrl = this.configService.get('naver.callbackUrl');
    const clinetId = this.configService.get('naver.clientId');
    const redirectUrl = `https://nid.naver.com/oauth2.0/authorize?session=false&property=user&response_type=code&redirect_uri=${callbackUrl}&scope=profile&client_id=${clinetId}`;

    return redirectUrl;
  }
}
