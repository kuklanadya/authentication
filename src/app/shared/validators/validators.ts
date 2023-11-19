import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CoreValidators {

    static isEmptyInputValue(value: string): boolean {
        return value == null || value.length === 0;
    }

    static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlPath);
            const matchingControl = formGroup.get(matchingControlPath);

            if (!control || !matchingControl) {
                return null;
            }

            if (matchingControl.hasError('mustMatch')) {
                delete matchingControl.errors?.['mustMatch'];
                matchingControl.updateValueAndValidity();
            }

            if (this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value) {
                return null;
            }

            const errors = { mustMatch: true };
            matchingControl.setErrors(errors);
            return errors;
        };
    }

    static passwordValidator(control: AbstractControl): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const password = control.value;
            const regex = /^(?=.*[a-zA-Z])(?=.*[-+*/])[\\w\-+*/]+$/u;

            if (!regex.test(password)) {
                return { invalidPassword: true };
            }

            return null;
        };
    }
}
