import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
    validate(date: string) {
        const inputDate = new Date(date);
        if (isNaN(inputDate.getTime())) {
          return false; // Invalid date string
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the current day
        return inputDate >= today;
    }
    defaultMessage() {
        return 'La fecha debe estar en el futuro.';
    }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
}
