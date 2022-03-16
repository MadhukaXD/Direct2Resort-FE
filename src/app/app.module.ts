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

@NgModule({
  declarations: [
    AppComponent,
    IvysLoginFormComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormWizardModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
