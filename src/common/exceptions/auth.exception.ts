import { HttpStatus } from '@nestjs/common';
import { AuthExceptionCodeEnum } from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';

export class VerificationNotFound extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.VerificationNotFound, HttpStatus.NOT_FOUND);
  }
}

export class VerificationExpired extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.VerificationExpired, HttpStatus.UNAUTHORIZED);
  }
}
