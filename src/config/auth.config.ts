import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  refreshExpires: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
}));
