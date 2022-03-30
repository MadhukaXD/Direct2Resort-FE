import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { IvysHeaderUserProfileService } from './ivys-header-user-profile.service';

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

  notifications: any;
  notificationCount: number;

  constructor(private loginService: LoginService, private router: Router, private ivysHeaderUserProfileService: IvysHeaderUserProfileService) { }

  ngOnInit() {
    this.loggedInUserData = this.loginService.getUserData();
    this.getNotifications();
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
    if(decodedJwt.userType === 3) {
      this.router.navigate(['/logistic-partner/dashboard']);
    }
  }

  goToUserProfile() {
    const decodedJwt = jwt_decode(localStorage.getItem('auth-token'));
    if(decodedJwt.userType === 1) {
      this.router.navigate(['/buyer/my-account']);
    }
    if(decodedJwt.userType === 2) {
      this.router.navigate(['/seller/my-account']);
    }
    if(decodedJwt.userType === 3) {
      this.router.navigate(['/logistic-partner/my-account']);
    }
  }

  getNotifications() {
    this.ivysHeaderUserProfileService.getNotifications().subscribe(
      data => {
        this.notifications = data.notificationList;  
        this.notificationCount = data.unSeenCount;     
      },
      (error) => {
        console.log(error);        
      }
    );
  }

  notificationOnClick(notification: any) {
    if(notification.notification_type === 'QUOTE' && notification.receiver_user_type === 'SELLER') {
      const quoteId = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/seller/manage-rfq/${quoteId}`]);
    } else if(notification.notification_type === 'QUOTE' && notification.receiver_user_type === 'BUYER') {
      const quoteId = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/buyer/manage-rfq/${quoteId}`]);
    } else if(notification.notification_type === 'PRODUCT' && notification.receiver_user_type === 'SELLER') {
      const productUrl = notification.notification_type_id;
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/seller/product/${productUrl}`]);
    } else if(notification.notification_type === 'PRODUCT_SERIES' && notification.receiver_user_type === 'SELLER') {
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/seller/product-series`]);
    } else if(notification.notification_type === 'MESSAGE' && notification.receiver_user_type === 'SELLER') {
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/seller/message-box`]);
    } else if(notification.notification_type === 'MESSAGE' && notification.receiver_user_type === 'BUYER') {
      this.notificationSeen(notification.notification_id);
      this.router.navigate([`/buyer/message-box`]);
    } 

    
  }

  notificationSeen(notificationId: number) {
    this.ivysHeaderUserProfileService.notificationSeen(notificationId).subscribe(
      data => {
        this.getNotifications();
      },
      (error) => {
        console.log(error);        
      }
    );
  }
}
