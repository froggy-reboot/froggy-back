import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { ArticleLikesService } from '../article-likes/article-likes.service';

@Injectable()
export class CheckLikeMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService, // private likeService: ArticleLikesService,
  ) {}
  public async use(req: Request, res: Response, next: () => void) {
    req.user = await this.verifyUser(req);
    const userId = req.user['id'];
    console.log(userId);
    // if (this.likeService.getLikedByUser(userId))
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
