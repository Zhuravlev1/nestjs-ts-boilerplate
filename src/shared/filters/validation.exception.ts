import { BadRequestException } from '@nestjs/common';

export interface CustomValidationErrors {
  property: string;
  value: string;
  message: string;
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: CustomValidationErrors[]) {
    super();
  }
}
