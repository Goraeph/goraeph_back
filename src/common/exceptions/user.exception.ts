import { HttpStatus } from '@nestjs/common';
import { UserExceptionCodeEnum } from '../enums/exceptions.enum';
import { BaseException } from '../interfaces/base.exception.interface';
import { ValidationError } from 'class-validator';

export class UserNotFoundException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.UserNotFound, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.NotAuthenticated, HttpStatus.NOT_ACCEPTABLE);
  }
}
export class EmailInUseException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.EmailExists, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class UsernameInUseException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.UsernameExists, HttpStatus.BAD_REQUEST);
  }
}

export class IncorrectPasswordException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.PasswordIncorrect, HttpStatus.BAD_REQUEST);
  }
}

export class FieldInvalidException extends BaseException {
  constructor() {
    super(UserExceptionCodeEnum.FieldInvalid, HttpStatus.BAD_REQUEST);
  }
}
