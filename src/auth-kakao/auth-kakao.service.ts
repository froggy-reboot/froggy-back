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
    const clinetId = this.configService.get('kakao.clientId');
    const redirectUrl = `https://nid.naver.com/oauth2.0/authorize?session=false&property=user&response_type=code&redirect_uri=${callbackUrl}&scope=profile&client_id=${clinetId}`;

    return redirectUrl;
  }
}
