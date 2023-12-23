import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseException } from '../interfaces/base.exception.interface';
import { DateFormatEnum, format } from '../enums/date-format.enum';
import { ValidationError } from 'class-validator';
import { FieldInvalidException } from '../exceptions/auth.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res = exception;
    if (res instanceof BaseException) {
      res.timeStamp = format(DateFormatEnum.Datetime);
      res.path = request.path;
      response.status(res.statusCode).json({
        errorCode: res.errorCode,
        statusCode: res.statusCode,
        timeStamp: res.timeStamp,
        path: res.path,
      });
    } else if (res instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        error: {
          message: res.message,
          name: res.name,
        },
      });
    } else if (res instanceof BadRequestException) {
      const message = res['response'].message[0];
      const invalidFieldException = new FieldInvalidException();
      invalidFieldException.msg = message;
      invalidFieldException.timeStamp = format(DateFormatEnum.Datetime);

      response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: invalidFieldException.errorCode,
        statusCode: invalidFieldException.statusCode,
        timeStamp: invalidFieldException.timeStamp,
        msg: invalidFieldException.msg,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ...res });
    }
  }
}
