import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const success = data !== null && data !== undefined;
        const message = success
          ? 'Data retrieved successfullyfff'
          : 'No data found';

        return {
          success: success,
          message: message,
          data: success ? data : null,
          statuscode: response.statusCode,
        };
      }),
    );
  }
}
