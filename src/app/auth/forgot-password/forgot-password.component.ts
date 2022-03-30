import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean = false;
  userData: {
    email: string
  }

  constructor(private loginService: LoginService, private snotifyService: SnotifyService, private route: Router) { }

  ngOnInit() {
    this.userData = {
      email: ''
    }
  }

  resetPassword() {
    this.isLoading = true;
    this.loginService.sendPwResetLink(this.userData.email).subscribe(
      data => {
        this.isLoading = false;
        if(data.status) {
          this.snotifyService.success(data.message);
          this.route.navigate(['login']);
        } else {
          this.snotifyService.error(data.message);
        }   
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err.error.message);       
      }
    )
  }
}
