import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from '../login.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  isLoading: boolean = false;
  userData: {
    email: string,
    password: string
  }

  componentToOpen: any;
  modalConfig: any;

  constructor(public bsModalRef: BsModalRef, private loginService: LoginService, private snotifyService: SnotifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.userData = {
      email: '',
      password: ''
    }
  }

  login() {    
    this.isLoading = true;
    this.loginService.login(this.userData.email, this.userData.password).subscribe(
      (data) => {
        this.isLoading = false;
        if(data) {
          this.bsModalRef.hide();
          this.bsModalRef = this.modalService.show(this.componentToOpen, this.modalConfig);
        }
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error(error.error.message);       
      },
      () => {
        this.isLoading = false;
      }
    )
  }
}
