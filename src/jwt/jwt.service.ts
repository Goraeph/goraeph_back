import { Inject, Injectable } from '@nestjs/common';
import { JWT_OPTIONS } from 'src/common/constants/constants';
import { JwtOptions } from './jwt.options.interface';

@Injectable()
export class JwtService {
  constructor(@Inject(JWT_OPTIONS) private options: JwtOptions) {}

  async verify(token: string) {}

  async createToken(id: number) {}

  async parseToken(header: string) {}
}
