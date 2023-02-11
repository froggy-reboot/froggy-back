import { registerAs } from '@nestjs/config';

export default registerAs('naver', () => ({
  clientId: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackUrl: process.env.NAVER_CALL_BACK_URL,
}));
