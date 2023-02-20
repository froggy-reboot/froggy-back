import { Injectable } from '@nestjs/common';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');
const randomString = require('randomstring');
@Injectable()
export class AuthRavelryService {
  async getRedirectUrl() {
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
    const authorizationUri = client.authorizeURL({
      redirect_uri: process.env.RAVELRY_CALL_BACK_URL,
      scope: 'patternstore-read',
      state: randomString.generate(),
    });

    return authorizationUri;
  }
}
