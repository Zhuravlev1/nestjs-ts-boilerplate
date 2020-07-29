import { ValidationError } from '@nestjs/common';
import { CustomValidationErrors, ValidationException } from '../filters/validation.exception';

export function customExceptionFactory(errors: ValidationError[]) {
  const customValidationErrors: CustomValidationErrors[] = [];

  function getFiniteValue(validationErrors: ValidationError[]) {
    function getProp(errors: ValidationError[]) {
      errors.forEach((error: ValidationError) => {
        for (const prop in error) {
          if (prop === 'constraints' && error.children.length === 0) {
            customValidationErrors.push({
              'property': error.property,
              'value': error.value,
              'message': Object.values(error.constraints).join(', '),
            });
          }

          if (typeof (error.children) === 'object' && prop === 'children') {
            error.children.map(item => {
              if (item.constraints && item.children.length === 0) {
                customValidationErrors.push({
                  'property': item.property,
                  'value': item.value,
                  'message': Object.values(item.constraints).join(', '),
                });
              }

              if (item.children && item.children.length > 0) {
                getProp(item.children);
              }
            });
          }
        }
      });
    }

    getProp(validationErrors);
  }

  getFiniteValue(errors);
  return new ValidationException(customValidationErrors);
}