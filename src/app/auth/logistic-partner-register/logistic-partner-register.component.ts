import { Component, OnInit } from '@angular/core';
import { LpData } from './logistic.types';
import { LogisticPartnerRegisterService } from './logistic-partner-register.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logistic-partner-register',
  templateUrl: './logistic-partner-register.component.html',
  styleUrls: ['./logistic-partner-register.component.scss']
})
export class LogisticPartnerRegisterComponent implements OnInit {
  isEmailExisting: boolean = false;
  registrationSuccess: number; // success === 1 failed === 2

  isSeller: boolean;
  hasBrand: boolean;
  countryList: any;
  stepTwo: boolean = false;
  confirmPw: string;
  isValidImg: boolean = false;

  sellerData: LpData;
  isComplete: boolean = false;
  isLoading: boolean = false;
  ciDoc: any;
  constructor(private logisticPartnerRegisterService: LogisticPartnerRegisterService, private loginService: LoginService) { }

  ngOnInit() {
    this.sellerData = {
      company_name: '',
      company_street_address: '',
      company_state: '',
      company_zip_code: '',
      company_city: '',
      company_country: '',
      company_tp: '',
      company_vat_gst: '',
      company_ci_doc: '',

      gen_p_full_name: '',
      gen_p_email: '',
      password: '',
      UserCategory_user_category_id: '3'
    }
    this.getCountries();
  }

  wonComplete = (event) => {
    this.isComplete = true;
    this.isLoading = true;

    console.log(this.sellerData);
    
    this.logisticPartnerRegisterService.registerCompany(this.sellerData).subscribe(
      () => {
        this.isLoading = false;
        this.registrationSuccess = 1;
      },
      (error) => {
        this.isLoading = false;
        this.registrationSuccess = 2;
        console.log(error);        
      }
    )

  }
  
  onStep1Next = (e) => {
    this.stepTwo = true;
    console.log(this.sellerData);    
  }

  getCountries(){
    this.logisticPartnerRegisterService.getCountryList().subscribe((countries: any) => this.countryList = countries);
  }

  onFileChanged(event) {
    const file = event.target.files[0];

    if (file.type.split('/')[0] !== 'image') {
      this.isValidImg = false;
    } else {
      this.isValidImg = true;
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.sellerData.company_ci_doc = myReader.result.toString();  
      };
      myReader.readAsDataURL(file);
    }    
  }

  checkEmailAdress(email: string) {
    const emailValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(emailValidate.test(email)) {
      this.loginService.checkEmailExist(email).subscribe(
        data => {
          if(data.status) {
            this.isEmailExisting = true;
          } else {
            this.isEmailExisting = false;
          }
        }
      );
    }    
  }
}
