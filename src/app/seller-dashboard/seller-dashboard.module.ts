import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { SellerDashboardSidebarComponent } from './seller-dashboard-sidebar/seller-dashboard-sidebar.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvysHeaderComponent } from '../components/ivys-header/ivys-header.component';
import { IvysHeaderActionsComponent } from '../components/ivys-header-actions/ivys-header-actions.component';
import { IvysHeaderUserProfileComponent } from '../components/ivys-header-user-profile/ivys-header-user-profile.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { IvysProductCardComponent } from '../components/ivys-product-card/ivys-product-card.component';
import { IvysRfqModalComponent } from '../components/ivys-rfq-modal/ivys-rfq-modal.component';
import { IvysHeaderLoginComponent } from '../components/ivys-header-login/ivys-header-login.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SellerManageQuotesComponent } from './seller-manage-quotes/seller-manage-quotes.component';
import { SellerQuoteManagementComponent } from './seller-quote-management/seller-quote-management.component';
import { DataTablesModule } from 'angular-datatables';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    SellerDashboardComponent, 
    SellerDashboardSidebarComponent, 
    ProductListingComponent, 
    IvysHeaderComponent,
    IvysHeaderUserProfileComponent,
    IvysHeaderActionsComponent,
    IvysProductCardComponent,
    AddProductComponent,
    IvysRfqModalComponent,
    IvysHeaderLoginComponent,
    SellerManageQuotesComponent,
    SellerQuoteManagementComponent
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    NgbModule,
    FormsModule,
    NgxDropzoneModule,
    TabsModule.forRoot(),
    CKEditorModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    PopoverModule.forRoot(),
    DataTablesModule,
    SnotifyModule
  ],
  exports: [
    IvysHeaderComponent,
    IvysHeaderUserProfileComponent,
    IvysHeaderActionsComponent,
    IvysProductCardComponent,
    IvysRfqModalComponent,
    IvysHeaderLoginComponent
  ],
  entryComponents: [IvysRfqModalComponent],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ]
})
export class SellerDashboardModule { }
