import { Component, OnInit } from '@angular/core';
import { RegisterData } from './register.types';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData;
  isComplete: boolean = false;
  isLoading: boolean = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.registerData = {
      company_name: '',
      company_email: '',
      company_website: '',
      company_street_address: '',
      company_state: '',
      company_zip_code: '',
      company_city: '',
      company_country: '',
      company_tp: '',

      gen_p_full_name: '',
      gen_p_email: '',
      password: '',
      UserCategory_user_category_id: ''
    }
  }

  wonComplete = (event) => {
    this.isComplete = true;
    this.isLoading = true;
    this.registerService.registerCompany(this.registerData).subscribe(
      () => {},
      (error) => {
        this.isLoading = false;
        console.log(error);        
      },
      () => {
        this.isLoading = false;
      }
    )
  }
  
  onStep1Next = (e) => {
    console.log(this.registerData);
    
  }
}
