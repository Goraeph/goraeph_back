import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BaseException } from '../interfaces/base.exception.interface';
import { DateFormatEnum, format } from '../enums/date-format.enum';
import { ValidationError } from 'class-validator';

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
        ok: false,
        error: {
          errorCode: res.errorCode,
          statusCode: res.statusCode,
          timeStamp: res.timeStamp,
          path: res.path,
        },
      });
    } else if (Array.isArray(res) && checkType(res, ValidationError)) {
      const result = unpackError(res);
      response.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        error: [...result],
      });
    } else if (res instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        error: {
          message: res.message,
          name: res.name,
        },
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ ...res });
    }
  }
}

const checkType = (arr: any[], type: any) => {
  return arr.every((item) => item instanceof type);
};

const unpackError = (arr: ValidationError[]) => {
  const result = [];
  arr.map(({ constraints, property }) => {
    result.push({ constraints, property });
  });
  return result;
};
