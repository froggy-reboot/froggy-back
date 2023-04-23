import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticleLikesService } from '../../article-likes/article-likes.service';
import { ArticleLikesModule } from '../../article-likes/article-likes.module';

@Injectable()
export class CheckLikeInterceptor implements NestInterceptor {
  constructor(private readonly likeService: ArticleLikesService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request['user']['id'];

    return next.handle().pipe(
      tap(() => console.log(`After...`)), // post-request
      tap((articles) =>
        articles.forEach((article) =>
          console.log(JSON.stringify(article['writerId']) + ' 안뇽 경규예요'),
        ),
      ),
      map((articles) => {
        // if (Array.isArray(articles)) {
        return articles.map((article) => ({
          ...article,
          likedByUser: !!this.likeService.getLikedByUser(userId, article['id']),
        }));
      }),
    );
  }
}
