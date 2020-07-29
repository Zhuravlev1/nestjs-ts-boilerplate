import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { enErrors } from './en';
import { ErrorType } from './errorType';

export function generateHttpError(
  language: string,
  key: ErrorType,
  httpStatus: HttpStatus,
  param?: any,
) {
  switch (language) {
    /*  case 'en' : {}*/
    default: {
      throw new HttpException(
        {
          error: {
            title: enErrors[key].errorTitle,
            message: enErrors[key].message(param),
            code: enErrors[key].errorCode,
          },
        },
        httpStatus,
      );
    }
  }
}