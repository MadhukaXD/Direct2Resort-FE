import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IvysLoginFormComponent } from './components/ivys-login-form/ivys-login-form.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormWizardModule } from 'angular2-wizard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { BuyerRegisterComponent } from './auth/buyer-register/buyer-register.component';
import { SellerRegisterComponent } from './auth/seller-register/seller-register.component';
import { SharedModule } from './shared/shared/shared.module';
import { PasswordConfirm } from './_helpers/password-matching.directive';
import { LogisticPartnerRegisterComponent } from './auth/logistic-partner-register/logistic-partner-register.component';
import { EmailExist } from './_helpers/validate-email.directive';
import { LoginPopupComponent } from './auth/login-popup/login-popup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    IvysLoginFormComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    BuyerRegisterComponent,
    SellerRegisterComponent,
    PasswordConfirm,
    LogisticPartnerRegisterComponent,
    EmailExist,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormWizardModule,
    SharedModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    SnotifyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
