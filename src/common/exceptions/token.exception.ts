import { HttpStatus } from '@nestjs/common';
import { TokenExceptionCodeEnum } from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';

export class TokenNotFoundException extends BaseException {
  constructor() {
    super(TokenExceptionCodeEnum.TokenNotFound, HttpStatus.NOT_FOUND);
  }
}
