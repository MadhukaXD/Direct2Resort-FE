import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ivys-header-user-profile',
  templateUrl: './ivys-header-user-profile.component.html',
  styleUrls: ['./ivys-header-user-profile.component.scss']
})
export class IvysHeaderUserProfileComponent implements OnInit {
  loggedInUserData: {
    email: string,
    fullName: string,
    firstName: string,
    lastName: string
  }
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loggedInUserData = this.loginService.getUserData();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
  
  goToUserAccount() {
    const decodedJwt = jwt_decode(localStorage.getItem('auth-token'));
    if(decodedJwt.userType === 1) {
      this.router.navigate(['/buyer/my-quotes']);
    }
    if(decodedJwt.userType === 2) {
      this.router.navigate(['/seller/product-listing']);
    }
  }
}
