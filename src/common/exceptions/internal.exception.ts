import { HttpStatus } from '@nestjs/common';
import {
  AuthExceptionCodeEnum,
  NestExceptionCodeEnum,
} from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';

export class InternalServerException extends BaseException {
  constructor() {
    super(
      AuthExceptionCodeEnum.InternalServerError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
