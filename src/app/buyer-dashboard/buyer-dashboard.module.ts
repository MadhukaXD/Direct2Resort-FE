import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerDashboardRoutingModule } from './buyer-dashboard-routing.module';
import { BuyerDashboardComponent } from './buyer-dashboard.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { SellerDashboardModule } from '../seller-dashboard/seller-dashboard.module';
import { BuyerDashboardSidebarComponent } from './buyer-dashboard-sidebar/buyer-dashboard-sidebar.component';
import { BuyerManageQuoteComponent } from './buyer-manage-quote/buyer-manage-quote.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [BuyerDashboardComponent, MyQuotesComponent, BuyerDashboardSidebarComponent, BuyerManageQuoteComponent],
  imports: [
    CommonModule,
    BuyerDashboardRoutingModule,
    SellerDashboardModule,
    NgbModule,
    FormsModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    DataTablesModule
  ]
})
export class BuyerDashboardModule { }
