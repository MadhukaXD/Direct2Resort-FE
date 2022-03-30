import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './auth/register/register.component';
import { BuyerRegisterComponent } from './auth/buyer-register/buyer-register.component';
import { SellerRegisterComponent } from './auth/seller-register/seller-register.component';
import { LogisticPartnerRegisterComponent } from './auth/logistic-partner-register/logistic-partner-register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },   
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
      },
      {
        path: 'buyer-register',
        component: BuyerRegisterComponent,
        pathMatch: 'full'
      },
      {
        path: 'seller-register',
        component: SellerRegisterComponent,
        pathMatch: 'full'
      },
      {
        path: 'logistic-partner-register',
        component: LogisticPartnerRegisterComponent,
        pathMatch: 'full'        
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        pathMatch: 'full'
      },
      {
        path: 'reset-password/:pwToken',
        component: ResetPasswordComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      allowedRoles: [2]
    },
    loadChildren: './seller-dashboard/seller-dashboard.module#SellerDashboardModule',
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      allowedRoles: [1]
    },
    loadChildren: './buyer-dashboard/buyer-dashboard.module#BuyerDashboardModule'
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      allowedRoles: [3]
    },
    loadChildren: './logistic-partner/logistic-partner.module#LogisticPartnerModule'
  },
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
