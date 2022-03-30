import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticPartnerRoutingModule } from './logistic-partner-routing.module';
import { LogisticPartnerDashboardComponent } from './logistic-partner-dashboard/logistic-partner-dashboard.component';
import { LogisticPartnerComponent } from './logistic-partner.component';
import { SharedModule } from '../shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LogisticPartnerSidebarComponent } from './logistic-partner-sidebar/logistic-partner-sidebar.component';
import { Ng2LoadingSpinnerModule, ANIMATION_TYPES } from 'ng2-loading-spinner';
import { BidManagerComponent } from './bid-manager/bid-manager.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import {DatePipe} from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { SnotifyService, ToastDefaults, SnotifyModule } from 'ng-snotify';
import { BidHistoryComponent } from './bid-history/bid-history.component';

@NgModule({
  declarations: [LogisticPartnerComponent, LogisticPartnerDashboardComponent, LogisticPartnerSidebarComponent, BidManagerComponent, BidHistoryComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    LogisticPartnerRoutingModule,
    SharedModule, 
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    AngularMyDatePickerModule,
    MomentModule,
    SnotifyModule,
    ModalModule.forRoot()
  ],
  providers: [
    DatePipe,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ]
})
export class LogisticPartnerModule { }
