import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${environment.apiPath}/auth/login`, {email: email, password: password, userType: 'Other'}).pipe(
      map((result: any) => {
        if(result.token){
          localStorage.setItem('auth-token', result.token);
          this.isLoginSubject.next(true);
        }        
        return true;
      })
    )
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  routeUser() {
    this.router.navigate(['/home']);
    /*const decodedJwt = jwt_decode(localStorage.getItem('auth-token'));
    if(decodedJwt.userType === 1) {
      this.router.navigate(['/buyer']);
    }
    if(decodedJwt.userType === 2) {
      this.router.navigate(['/seller/manage-quotes']);
    }
    if(decodedJwt.userType === 3) {
      this.router.navigate(['/logistic-partner/dashboard']);
    }*/
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  getUserData(): any {
    const decodedJwt = jwt_decode(localStorage.getItem('auth-token'));    
    return {email: decodedJwt.email, fullName: decodedJwt.name, firstName: decodedJwt.name.split(" ")[0], lastName: decodedJwt.name.split(" ")[1]};
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.isLoginSubject.next(false);
  }

  checkEmailExist(email: string) {
    return this.http.post(`${environment.apiPath}/auth/checkIfEmailExist`, {email}).pipe(
      map((result: any) => {     
        return result;
      })
    )    
  }

  sendPwResetLink(userEmail: string) {
    return this.http.post(`${environment.apiPath}/auth/forgotPassword`, {userEmail}).pipe(
      map((result: any) => {     
        return result;
      })
    )  
  }

  updateNewPassword(pwData: any) {
    return this.http.post(`${environment.apiPath}/auth/resetPasswordByToken`, {newPassword: pwData.confirmPw, pwToken: pwData.token}).pipe(
      map((result: any) => {     
        return result;
      })
    )  
  }
}
