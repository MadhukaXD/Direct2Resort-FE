import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerDashboardModule } from '../seller-dashboard/seller-dashboard.module';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeMainSliderComponent } from './home/home-main-slider/home-main-slider.component';
import { HomeOurPromiseComponent } from './home/home-our-promise/home-our-promise.component';
import { HomeFeaturedProductsComponent } from './home/home-featured-products/home-featured-products.component';
import { HomeAdBannersComponent } from './home/home-ad-banners/home-ad-banners.component';
import { HomeTopSellersComponent } from './home/home-top-sellers/home-top-sellers.component';
import { HomeNewProductsComponent } from './home/home-new-products/home-new-products.component';
import { IvysFooterComponent } from '../components/ivys-footer/ivys-footer.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { ANIMATION_TYPES } from 'ng2-loading-spinner';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ShopSidebarComponent } from './shop/shop-sidebar/shop-sidebar.component';
import { ProductRelatedProductsComponent } from './product/product-related-products/product-related-products.component';
import { SharedModule } from '../shared/shared/shared.module';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { RfqModalComponent } from './product/rfq-modal/rfq-modal.component';
import { LoginPopupComponent } from '../auth/login-popup/login-popup.component';
import { ShopByCatComponent } from './shop-by-cat/shop-by-cat.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShopSeriesComponent } from './shop-series/shop-series.component';
import { ShopSeriesSidebarComponent } from './shop-series/shop-series-sidebar/shop-series-sidebar.component';
import { SeriesViewComponent } from './shop-series/series-view/series-view.component';
import { SeriesViewSidebarComponent } from './shop-series/series-view/series-view-sidebar/series-view-sidebar.component';
import { SeriesRfqModalComponent } from './shop-series/series-view/series-rfq-modal/series-rfq-modal.component';
import { MessageBoxComponent } from './product/message-box/message-box.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurPromiseComponent } from './our-promise/our-promise.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SampleRequestComponent } from './product/sample-request/sample-request.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ShopComponent,
    ProductComponent,
    HomeMainSliderComponent,
    HomeOurPromiseComponent,
    HomeFeaturedProductsComponent,
    HomeAdBannersComponent,
    HomeTopSellersComponent,
    HomeNewProductsComponent,
    ShopSidebarComponent,
    ProductRelatedProductsComponent,
    EmailVerifyComponent,
    RfqModalComponent,
    LoginPopupComponent,
    ShopByCatComponent,
    ContactUsComponent,
    ShopSeriesComponent,
    ShopSeriesSidebarComponent,
    SeriesViewComponent,
    SeriesViewSidebarComponent,
    SeriesRfqModalComponent,
    MessageBoxComponent,
    AboutUsComponent,
    OurPromiseComponent,
    NotFoundComponent,
    SampleRequestComponent,
    FaqPageComponent
  ],
  imports: [    
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    SlickCarouselModule,
    CarouselModule,
    TabsModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    SnotifyModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  entryComponents: [RfqModalComponent, LoginPopupComponent, SeriesRfqModalComponent, MessageBoxComponent, SampleRequestComponent]
})
export class PagesModule { }
