import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-naver';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('naver.clientId'),
      clientSecret: configService.get('naver.clientSecret'),
      callbackURL: configService.get('naver.callbackUrl'),
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any,
  ) {
    try {
      // console.log(profile);
      // const jwt = 'placeholderJWT';
      // const user = {
      //   jwt,
      // };
      return {
        provider: 'naver',
        email: profile._json.email,
        refreshToken,
        accessToken,
      };
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}
