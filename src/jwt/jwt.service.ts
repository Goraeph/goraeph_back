import { Inject, Injectable } from '@nestjs/common';
import { JWT_OPTIONS } from '../common/constants/constants';
import { JwtOptions } from './jwt.options.interface';
import * as jwt from 'jsonwebtoken';
import { JwtVerifyFailedException } from '../common/exceptions/jwt.exception';
import { JWTExpireTimeEnum } from '../common/enums/jwt-expire-time.enum';
import { InternalServerException } from '../common/exceptions/internal.exception';
import { IJWTDecode } from './jwt.interface';
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

  async createToken(id: number, time: JWTExpireTimeEnum) {
    try {
      const token = jwt.sign({ id: id }, this.options.secretKey, {
        algorithm: 'HS256',
        expiresIn: time,
      });
      return token;
    } catch (error) {
      throw new InternalServerException();
    }
  }

  async decodeToken(token: string) {
    try {
      const json = jwt.decode(token);
      return json;
    } catch (error) {
      throw new InternalServerException();
    }
  }
  async parseHeader(header: string) {
    const bearer = 'Bearer';
    const index = header.lastIndexOf(bearer) + bearer.length;
    const token = header.substring(index).trim();
    return token;
  }
}
