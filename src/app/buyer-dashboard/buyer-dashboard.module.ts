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
import { SharedModule } from '../shared/shared/shared.module';
import { SnotifyModule, ToastDefaults, SnotifyService } from 'ng-snotify';
import { ManageRfqComponent } from './my-quotes/manage-rfq/manage-rfq.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BuyerMessageBoxComponent } from './buyer-message-box/buyer-message-box.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BuyerDashboardPageComponent } from './buyer-dashboard-page/buyer-dashboard-page.component';

@NgModule({
  declarations: [BuyerDashboardComponent, MyQuotesComponent, BuyerDashboardSidebarComponent, BuyerManageQuoteComponent, ManageRfqComponent, BuyerMessageBoxComponent, BuyerDashboardPageComponent],
  imports: [
    CommonModule,
    BuyerDashboardRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    DataTablesModule,
    SnotifyModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ]
})
export class BuyerDashboardModule { }
