import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CheckLikeInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Before...');
    const body = await JSON.stringify(context.switchToHttp().getRequest().body);
    console.log('body : ' + body);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)), // post-request
      map((data) => console.log(data)), // 여기서 data는 컨트롤러를 거친 후 응답(response)에 대한 data
    );
  }
}
