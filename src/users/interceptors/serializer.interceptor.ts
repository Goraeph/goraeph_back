import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/user.entity';

export function UserSerializer(dto: any) {
  return UseInterceptors(new SerializeUserInterceptor(dto));
}

class SerializeUserInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: User) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
