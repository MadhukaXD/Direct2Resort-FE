import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { BuyerManageQuoteComponent } from './buyer-manage-quote/buyer-manage-quote.component';
import { ManageRfqComponent } from './my-quotes/manage-rfq/manage-rfq.component';
import { BuyerMessageBoxComponent } from './buyer-message-box/buyer-message-box.component';
import { BuyerDashboardPageComponent } from './buyer-dashboard-page/buyer-dashboard-page.component';
import { MyAccountComponent } from '../components/my-account/my-account.component';

const routes: Routes = [
  {
    path: 'buyer',
    component: BuyerDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: BuyerDashboardPageComponent
      },
      {
        path: 'my-quotes',
        component: MyQuotesComponent
      },
      {
        path: 'manage-quote/:quoteId',
        component: BuyerManageQuoteComponent
      },
      {
        path: 'manage-rfq/:quoteId',
        component: ManageRfqComponent
      },
      {
        path: 'message-box',
        component: BuyerMessageBoxComponent
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
export class BuyerDashboardRoutingModule { }
