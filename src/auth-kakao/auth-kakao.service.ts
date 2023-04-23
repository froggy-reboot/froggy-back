import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../social/interfaces/social.interface';
import { KakaoInterface } from './interfaces/kakao.interface';
import { AuthKakaoLoginDto } from './dto/auth-kakao-login.dto';
import { enrollType } from '../users/entities/user.entity';

@Injectable()
export class AuthKakaoService {
  constructor(private configService: ConfigService) {}

  getRedirectUrl(): string {
    const callbackUrl = this.configService.get('kakao.callbackUrl');
    const clientId = this.configService.get('kakao.clientId');

    // const redirectUrl = `https://accounts.kakao.com/login/?continue=https://kauth.kakao.com/oauth/authorize?scope=account_email&response_type=code&redirect_uri=${callbackUrl}&through_account=true&client_id=${clinetId}#login`;
    const redirectUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}&response_type=code `;
    return redirectUrl;
  }
}
