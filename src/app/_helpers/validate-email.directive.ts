import { Directive, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import { LoginService } from '../auth/login.service';


@Directive({
 selector: '[emailExist]',
 providers: [{provide: NG_VALIDATORS, useExisting: EmailExist, multi: true}]
})
export class EmailExist implements Validator {
    constructor (private loginService: LoginService) {}
    validate(c: FormControl): ValidationErrors {
        const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let v = c.value;
        let test = false;
        const message = {
            'emailExist': {
                'message': 'This email is already existing.'
            }
        };

        if(emailValidate.test(v)) {
            this.loginService.checkEmailExist(v).subscribe(
                (data: any) => {
                    if(data.status) {
                        test = true;
                    }                 
                }
            );            
        }
       if(test) {
        return {
            emailExist: message
        }
       } else {
        return null;  
       }
        
    }

    
}