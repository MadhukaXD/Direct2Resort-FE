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
import { IvysHeaderSearchComponent } from '../components/ivys-header-search/ivys-header-search.component';
import { SearchHighlight } from '../_helpers/search-highlight.pipe';
import { ProductSeriesComponent } from './product-series/product-series.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReadyToShipComponent } from './ready-to-ship/ready-to-ship.component';
import { ReadyToShipManageComponent } from './ready-to-ship-manage/ready-to-ship-manage.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from '../shared/shared/shared.module';
import { SubmitedLpListComponent } from './submited-lp-list/submited-lp-list.component';
import { SubmitedToLpComponent } from './submited-to-lp/submited-to-lp.component';
import { SellerProductSingleComponent } from './seller-product-single/seller-product-single.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SeriesProductsComponent } from './product-series/series-products/series-products.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SellerSingleRfqComponent } from './seller-manage-quotes/seller-single-rfq/seller-single-rfq.component';
import { SellerShippingManagerComponent } from './ready-to-ship/seller-shipping-manager/seller-shipping-manager.component';
import { SellerMessageBoxComponent } from './seller-message-box/seller-message-box.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { EditSeriesComponent } from './product-series/edit-series/edit-series.component';
import { ImgCropperComponent } from './product-series/img-cropper/img-cropper.component';
import {NgxImageCompressService} from 'ngx-image-compress';

ToastDefaults.global.maxAtPosition = 1;

@NgModule({
  declarations: [
    SellerDashboardComponent, 
    SellerDashboardSidebarComponent, 
    ProductListingComponent, 
    AddProductComponent,
    SellerManageQuotesComponent,
    SellerQuoteManagementComponent,
    ProductSeriesComponent,
    ReadyToShipComponent,
    ReadyToShipManageComponent,
    EditProductComponent,
    SubmitedLpListComponent,
    SubmitedToLpComponent,
    SellerProductSingleComponent,
    SeriesProductsComponent,
    SellerSingleRfqComponent,
    SellerShippingManagerComponent,
    SellerMessageBoxComponent,
    EditSeriesComponent,
    ImgCropperComponent
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    NgbModule,
    FormsModule,
    NgxDropzoneModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CKEditorModule,
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    PopoverModule.forRoot(),
    DataTablesModule,
    SnotifyModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule,
    SlickCarouselModule,
    NgMultiSelectDropDownModule,
    AutocompleteLibModule,
    ImageCropperModule,
    CurrencyMaskModule
  ],
  entryComponents: [IvysRfqModalComponent, EditSeriesComponent, ImgCropperComponent],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    NgxImageCompressService
  ]
})
export class SellerDashboardModule { }
