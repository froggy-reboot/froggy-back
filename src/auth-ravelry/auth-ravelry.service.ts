import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { SocialInterface } from 'src/social/interfaces/social.interface';
import { enrollType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RavelryUsersService } from 'src/ravelry-users/ravelry-users.service';
import { ravelryUserDto } from './dto/auth-ravelry.dto';
import { customBool } from 'src/ravelry-users/entities/ravelry-user.entity';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');
const randomString = require('randomstring');

@Injectable()
export class AuthRavelryService {
  constructor(
    private http: HttpService,
    private ravelryUsersService: RavelryUsersService,
    private usersService: UsersService,
  ) {}

  async getRedirectUrl() {
    const client = this.getClient();
    const authorizationUri = client.authorizeURL({
      redirect_uri: process.env.RAVELRY_CALL_BACK_URL,
      scope: 'patternstore-read',
      state: randomString.generate(),
    });

    return authorizationUri;
  }
  async getLinkRedirectUrl() {
    const client = this.getLinkClient();
    const authorizationUri = client.authorizeURL({
      redirect_uri: process.env.RAVELRY_LINK_CALL_BACK_URL,
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
      scope: 'offline patternstore-read',
    };

    const getTokenResult = await client.getToken(tokenParams, { json: true });
    const accessToken = getTokenResult.token.access_token;
    return accessToken;
  }

  async getLinkAccessToken(req) {
    const client = this.getLinkClient();

    const tokenParams = {
      code: req.query.code,
      redirect_uri: process.env.RAVELRY_LINK_CALL_BACK_URL,
      scope: 'offline patternstore-read',
    };

    const getTokenResult = await client.getToken(tokenParams, { json: true });
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
    const ravelryUserInfo: ravelryUserDto = data.user;
    return ravelryUserInfo;
  }

  async findOrCreateRavelryUser(ravelryUserInfo, accessToken) {
    const ravelryUser = await this.ravelryUsersService.findOne({
      ravelryId: ravelryUserInfo.id,
    });

    if (!ravelryUser) {
      const createRavelryUserResult = await this.ravelryUsersService.create({
        ravelryId: ravelryUserInfo.id,
        token: accessToken,
        username: ravelryUserInfo.username,
      });
      return createRavelryUserResult;
    }
    return ravelryUser;
  }

  async saveAuthRavelryUser(ravelryUserInfo, accessToken) {
    const newRavelryUser = await this.ravelryUsersService.create({
      ravelryId: ravelryUserInfo.id,
      token: accessToken,
      username: ravelryUserInfo.username,
    });
    return newRavelryUser;
  }

  async linkRavelryToAnotherAccount(user, dto) {
    const { socialUserId } = dto;
    await this.usersService.update(user.id, {
      ravelryUserId: socialUserId,
      isRavelryIntegrated: customBool.Y,
    });
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

  getLinkClient() {
    const config = {
      client: {
        id: process.env.RAVELRY_LINK_CLIENT_ID,
        secret: process.env.RAVELRY_LINK_CLIENT_SECRET,
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

  genSocialData(ravelryUser) {
    const ravelryEmail = ravelryUser.ravelryId + '@ravelry.com';

    const socialData: SocialInterface = {
      enrollType: enrollType.ravelry,
      email: ravelryEmail,
      password: null,
      isRavelryIntegrated: customBool.Y,
      ravelryUserId: ravelryUser.id,
      isCertified: customBool.Y,
    };
    console.log('gen social data result :', socialData);

    return socialData;
  }
}
