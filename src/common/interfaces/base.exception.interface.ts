import { HttpException } from '@nestjs/common';

export interface IBaseException {
  errorCode: string;
  timeStamp: string;
  statusCode: number;
  path: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
  errorCode: string;
  statusCode: number;
  timeStamp: string;
  path: string;
}
