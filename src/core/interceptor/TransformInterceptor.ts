import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponse } from './../interface/HttpResponse';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => {
            const response: HttpResponse = {
                statusCode: context.switchToHttp().getResponse().statusCode,
                data: data || null
            };

            return response;
        }));
    }
}