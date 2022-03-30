import { Component, OnInit } from '@angular/core';
import { MyAccountService } from './my-account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userInfo: {
    city: string,
    companyName: string,
    country: string,
    email: string,
    name: string,
    state: string,
    street: string,
    telephone: string,
    vatGst: string,
    zip: string
  };

  constructor(private myAccountService: MyAccountService) { }

  ngOnInit() {
    this.userInfo = {
      city: "",
      companyName: "",
      country: "",
      email: "",
      name: "",
      state: "",
      street: "",
      telephone: "",
      vatGst: "",
      zip: ""
    };

    this.getMyAccount();
  }

  getMyAccount() {
    this.myAccountService.getUserInformation().subscribe(
      data => {
        this.userInfo = data;      
      }
    )
  }
}
