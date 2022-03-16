import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerManageQuotesComponent } from './seller-manage-quotes/seller-manage-quotes.component';
import { SellerQuoteManagementComponent } from './seller-quote-management/seller-quote-management.component';

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
        path: 'manage-quotes',
        component: SellerManageQuotesComponent
      },
      {
        path: 'manage-quote/:quoteId',
        component: SellerQuoteManagementComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerDashboardRoutingModule { }
