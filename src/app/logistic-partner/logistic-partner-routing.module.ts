import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticPartnerComponent } from './logistic-partner.component';
import { LogisticPartnerDashboardComponent } from './logistic-partner-dashboard/logistic-partner-dashboard.component';
import { BidManagerComponent } from './bid-manager/bid-manager.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { MyAccountComponent } from '../components/my-account/my-account.component';

const routes: Routes = [
  {
    path: 'logistic-partner',
    redirectTo: 'logistic-partner/dashboard'
  },
  {
    path: 'logistic-partner',
    component: LogisticPartnerComponent,
    children: [
      {
        path: 'dashboard',
        component: LogisticPartnerDashboardComponent
      },
      {
        path: 'bid/:itemId/:freightDataId',
        component: BidManagerComponent
      },
      {
        path: 'bid-history',
        component: BidHistoryComponent
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticPartnerRoutingModule { }
