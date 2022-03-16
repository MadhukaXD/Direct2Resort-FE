import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { BuyerManageQuoteComponent } from './buyer-manage-quote/buyer-manage-quote.component';

const routes: Routes = [
  {
    path: 'buyer',
    component: BuyerDashboardComponent,
    children: [
      {
        path: 'my-quotes',
        component: MyQuotesComponent
      },
      {
        path: 'manage-quote/:quoteId',
        component: BuyerManageQuoteComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerDashboardRoutingModule { }
