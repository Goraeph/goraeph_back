import { HttpStatus } from '@nestjs/common';
import {
  UserExceptionCodeEnum,
  NestExceptionCodeEnum,
} from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';

export class InternalServerException extends BaseException {
  constructor() {
    super(
      UserExceptionCodeEnum.InternalServerError,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
