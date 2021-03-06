import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private snotifyService: SnotifyService) {
    loginService.isLoggedIn().subscribe(data => {
      if(data) {
        loginService.routeUser();
      }    
    });    
  }

  userData: {
    email: string,
    password: string
  }

  ngOnInit() {
    this.userData = {
      email: '',
      password: ''
    }
  }

  login() {    
    this.isLoading = true;
    this.loginService.login(this.userData.email, this.userData.password).subscribe(
      () => {
        this.isLoading = false;
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
