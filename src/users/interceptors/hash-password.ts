import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

export function HashPassword() {
  return UseInterceptors(new HashPasswordInterceptor());
}
class HashPasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const input = req.body;

    if (input.password) {
      input.password = await bcrypt.hash(input.password, 12);
    }
    return next.handle();
  }
}
