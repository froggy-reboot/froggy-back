import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { enrollType } from 'src/users/entities/user.entity';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');
const randomString = require('randomstring');

@Injectable()
export class AuthRavelryService {
  constructor(private http: HttpService) {}
  async getRedirectUrl() {
    const client = this.getClient();
    const authorizationUri = client.authorizeURL({
      redirect_uri: process.env.RAVELRY_CALL_BACK_URL,
      scope: 'patternstore-read',
      state: randomString.generate(),
    });

    return authorizationUri;
  }
  async getAccessToken(req) {
    const client = this.getClient();

    const tokenParams = {
      code: req.query.code,
      redirect_uri: process.env.RAVELRY_CALL_BACK_URL,
      scope: 'patternstore-read',
    };

    const getTokenResult = await client.getToken(tokenParams);
    const accessToken = getTokenResult.token.access_token;
    return accessToken;
  }
  async getUserInfoByAccessToken(accessToken) {
    const requestConfig = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      params: {},
    };

    const request = this.http
      .get('https://api.ravelry.com/current_user.json', requestConfig)
      .pipe(
        catchError((error: AxiosError) => {
          throw 'ravelry get user error!';
        }),
      );
    const { data } = await firstValueFrom(request);
    return data.user;
  }
  getClient() {
    const config = {
      client: {
        id: process.env.RAVELRY_CLIENT_ID,
        secret: process.env.RAVELRY_CLIENT_SECRET,
      },
      auth: {
        tokenHost: 'https://www.ravelry.com',
        tokenPath: '/oauth2/token',
        authorizePath: '/oauth2/auth',
      },
    };
    const client = new AuthorizationCode(config);
    return client;
  }
  genSocialData(raverlyUserData, accessToken) {
    const raverlyEmail = raverlyUserData.id + '@raverly.com';

    const socialData: SocialInterface = {
      enroll_type: <enrollType>'raverly',
      email: raverlyEmail,
      password: null,
      raverly_token: accessToken,
    };

    return socialData;
  }
}
