import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IBaseException {
  errorCode: string;
  timeStamp: string;
  statusCode: number;
  path?: string;
  msg?: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  @ApiProperty()
  ok: boolean;
  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timeStamp: string;

  @ApiProperty()
  path?: string;

  @ApiProperty()
  msg?: string;
}
