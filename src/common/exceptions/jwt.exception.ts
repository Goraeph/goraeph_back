import { HttpStatus } from '@nestjs/common';
import { JwtExceptionCodeEnum } from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';

export class JwtVerifyFailedException extends BaseException {
  constructor() {
    super(
      JwtExceptionCodeEnum.JWTVerifyFailed,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
