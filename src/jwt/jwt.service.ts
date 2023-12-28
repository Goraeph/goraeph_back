import { Inject, Injectable } from '@nestjs/common';
import { JWT_OPTIONS } from 'src/common/constants/constants';
import { JwtOptions } from './jwt.options.interface';
import * as jwt from 'jsonwebtoken';
import { JwtVerifyFailedException } from 'src/common/exceptions/jwt.exception';
@Injectable()
export class JwtService {
  constructor(@Inject(JWT_OPTIONS) private options: JwtOptions) {}

  async verify(token: string) {
    try {
      jwt.verify(token, this.options.secretKey);
      return true;
    } catch (error) {
      throw new JwtVerifyFailedException();
    }
  }

  async createToken(id: number) {}

  async parseToken(header: string) {}
}
