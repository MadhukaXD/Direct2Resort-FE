import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './auth/register/register.component';

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
    loadChildren: './pages/pages.module#PagesModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
