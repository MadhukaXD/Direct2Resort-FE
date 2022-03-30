import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerManageQuotesComponent } from './seller-manage-quotes/seller-manage-quotes.component';
import { SellerQuoteManagementComponent } from './seller-quote-management/seller-quote-management.component';
import { ProductSeriesComponent } from './product-series/product-series.component';
import { ReadyToShipComponent } from './ready-to-ship/ready-to-ship.component';
import { ReadyToShipManageComponent } from './ready-to-ship-manage/ready-to-ship-manage.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SubmitedLpListComponent } from './submited-lp-list/submited-lp-list.component';
import { SubmitedToLpComponent } from './submited-to-lp/submited-to-lp.component';
import { SellerProductSingleComponent } from './seller-product-single/seller-product-single.component';
import { SeriesProductsComponent } from './product-series/series-products/series-products.component';
import { SellerSingleRfqComponent } from './seller-manage-quotes/seller-single-rfq/seller-single-rfq.component';
import { SellerShippingManagerComponent } from './ready-to-ship/seller-shipping-manager/seller-shipping-manager.component';
import { SellerMessageBoxComponent } from './seller-message-box/seller-message-box.component';
import { MyAccountComponent } from '../components/my-account/my-account.component';

const routes: Routes = [
  {
    path: 'seller',
    component: SellerDashboardComponent,
    children: [
      {
        path: 'product-listing',
        component: ProductListingComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'product/:url',
        component: SellerProductSingleComponent
      },
      {
        path: 'edit-product/:productId',
        component: EditProductComponent
      },
      {
        path: 'manage-quotes',
        component: SellerManageQuotesComponent
      },
      {
        path: 'manage-quote/:quoteId',
        component: SellerQuoteManagementComponent
      },
      {
        path: 'manage-rfq/:quoteId',
        component: SellerSingleRfqComponent
      },
      {
        path: 'product-series',
        component: ProductSeriesComponent
      },
      {
        path: 'series-products/:seriesRefId',
        component: SeriesProductsComponent
      },
      {
        path: 'ready-to-ship',
        component: ReadyToShipComponent
      },
      {
        path: 'shipping-manager/:quote_uuid',
        component: SellerShippingManagerComponent
      },
      {
        path: 'manage-ready-to-ship/:quoteId',
        component: ReadyToShipManageComponent
      },
      {
        path: 'lp-submited-list',
        component: SubmitedLpListComponent
      },
      {
        path: 'lp-submited/:quoteId',
        component: SubmitedToLpComponent
      },
      {
        path: 'message-box',
        component: SellerMessageBoxComponent
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
export class SellerDashboardRoutingModule { }
