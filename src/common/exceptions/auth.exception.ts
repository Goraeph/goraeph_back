import { HttpStatus } from '@nestjs/common';
import { AuthExceptionCodeEnum } from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';
import { ValidationError } from 'class-validator';

export class UserNotFoundException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.UserNotFound, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.NotAuthenticated, HttpStatus.NOT_ACCEPTABLE);
  }
}
export class EmailInUseException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.EmailExists, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class UsernameInUseException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.UsernameExists, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectPasswordException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.PasswordIncorrect, HttpStatus.BAD_REQUEST);
  }
}

export class FieldInvalidException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.FieldInvalid, HttpStatus.BAD_REQUEST);
  }
}
