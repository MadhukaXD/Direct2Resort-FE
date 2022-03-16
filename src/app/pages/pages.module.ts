import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';

import { PagesComponent } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerDashboardModule } from '../seller-dashboard/seller-dashboard.module';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    SellerDashboardModule,
    ModalModule.forRoot(),
    SlickCarouselModule
  ]
})
export class PagesModule { }
