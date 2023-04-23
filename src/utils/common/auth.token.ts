import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  public async use(req: Request, res: Response, next: () => void) {
    req.user = await this.verifyUser(req);
    return next();
  }

  private async verifyUser(req: Request) {
    let user: User = null;
    try {
      const { authorization } = req.headers;
      const token = authorization.replace('Bearer ', '').replace('bearer ', '');
      const decoded = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
      user = decoded;
    } catch (e) {
      console.log('e', e);
    }
    return user;
  }
}
