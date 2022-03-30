import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
 selector: '[pwConfirm]',
 providers: [{provide: NG_VALIDATORS, useExisting: PasswordConfirm, multi: true}]
})
export class PasswordConfirm implements Validator {

    constructor( @Attribute('pwConfirm') public pwConfirm: string) {}
    
    validate(c: FormControl): ValidationErrors {
        let v = c.value;
        let e = c.root.get(this.pwConfirm);
        const message = {
            'pwConfirm': {
                'message': 'Password Not maching'
            }
        };

        if (e && v !== e.value) return {
            pwConfirm: message
        }
        return null;  
    }
}