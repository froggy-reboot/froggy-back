import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ArticleLikesService } from '../../article-likes/article-likes.service';

@Injectable()
export class CheckLikeInterceptor implements NestInterceptor {
  constructor(private readonly likeService: ArticleLikesService) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];
    let userId: number;
    if (user == null) {
      userId = 0;
    } else userId = request['user']['id'];

    return next.handle().pipe(
      // tap((articles) =>
      //   articles.forEach(async (article) =>
      //     console.log(
      //       'here ' +
      //         (await this.likeService.getLikedByUser(userId, article['id'])),
      //     ),
      //   ),
      // ),
      map(async (articles) => {
        if (Array.isArray(articles)) {
          return await Promise.all(
            articles.map(async (article) => ({
              ...article,
              likedByUser: !!(await this.likeService.getLikedByUser(
                userId,
                article['id'],
              )),
            })),
          );
        } else {
          return {
            ...articles,
            likedByUser: !!(await this.likeService.getLikedByUser(
              userId,
              articles['id'],
            )),
          };
        }
      }),
    );
  }
}
