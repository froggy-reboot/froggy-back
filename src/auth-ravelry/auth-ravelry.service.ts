import { Injectable } from '@nestjs/common';
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} = require('simple-oauth2');

@Injectable()
export class AuthRavelryService {
  // async getProfileByToken(
  //   loginDto: AuthNaverLoginDto,
  // ): Promise<SocialInterface> {
  //   const ticket = await this.naver.verifyIdToken({
  //     idToken: loginDto.idToken,
  //     audience: [this.configService.get('naver.clientId')],
  //   });

  //   const data = ticket.getPayload();

  //   return {
  //     id: data.sub,
  //     email: data.email,
  //   };
  // }
  async getRedirectUrl() {
    const config = {
      client: {
        id: process.env.RAVELRY_CLIENT_ID,
        secret: process.env.RAVELRY_CLIENT_SECRET,
      },
      auth: {
        tokenHost: 'https://www.ravelry.com',
      },
    };
    const client = new AuthorizationCode(config);
    const authorizationUri = client.authorizeURL({
      redirect_uri: 'http://localhost:3000/callback',
      scope: '[profile-only]',
      state: '<state>',
    });
    // const oauth2 = require('simple-oauth2').create({
    //   auth: {
    //     tokenHost: 'https://www.ravelry.com',
    //     tokenPath: '/oauth2/token',
    //     authorizePath: '/oauth2/auth',
    //   },
    //   client: {
    //     id: process.env.RAVELRY_CLIENT_ID,
    //     secret: process.env.RAVELRY_CLIENT_SECRET,
    //   },
    // });

    return authorizationUri;
  }
}
