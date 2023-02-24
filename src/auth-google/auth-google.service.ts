import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { enrollType } from '../users/entities/user.entity';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService) {}

  getRedirectUrl(): string {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${this.configService.get(
      'google.callbackUrl',
    )}&scope=profile%20email&client_id=${this.configService.get(
      'google.clientId',
    )}`;
    console.log(redirectUrl);

    return redirectUrl;
  }
}
