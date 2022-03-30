import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  tokenSub: Subscription;
  userData: {
    newPassword: string,
    confirmPw: string,
    token: string
  }

  constructor(private loginService: LoginService, private snotifyService: SnotifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.userData = {
      newPassword: '',
      confirmPw: '',
      token: ''
    }

    this.tokenSub = this.route.params.subscribe(params => {
      this.userData.token = params.pwToken;
    });
  }

  resetPassword() {    
    this.isLoading = true;
    this.loginService.updateNewPassword(this.userData).subscribe(
      data => {
        this.isLoading = false;
        if(data.status) {
          this.snotifyService.success(data.message);
          this.router.navigate(['login']);
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
