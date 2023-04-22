import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('kakao.clientId'),
      callbackURL: configService.get('kakao.callbackUrl'),
      passReqToCallback: true,
      scope: ['account_email'],
    });
  }
  // @nestjs/passport PassportStrategy를 상속
  // passport-google-oauth20 Strategy 사용
  // Strategy의 이름은 'google'로 지정
  // validate 함수 내에서, 성공적인 google 로그인에 대한 유효성 검증
  // google에서 보내주는 'profile' 정보만 로그로 기록

  validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any, // any인게 맘에 안드는게 반환 스코프의 email만을 꺼내서 검사할 방법이 없을까
    done: any,
  ) {
    try {
      // const email = profile._json.kakao_account.email;
      // console.log(profile);
      //profile.emails[0].value, 에 email이 담김
      const customEmail = profile.id + '@kakaoId.com';
      return {
        provider: 'kakao',
        email: customEmail,
        refreshToken,
        accessToken,
      };
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}
