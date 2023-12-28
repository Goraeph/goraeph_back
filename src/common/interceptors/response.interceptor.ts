import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ResponseDTO } from '../dtos/response.dto';

export function ResponseSerializer() {
  return UseInterceptors(new ResponseInterceptor());
}
class ResponseInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        const res = new ResponseDTO();
        res.ok = true;
        res.data = data;
        return res;
      }),
    );
  }
}
