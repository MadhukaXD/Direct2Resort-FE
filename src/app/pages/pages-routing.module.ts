import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { ShopByCatComponent } from './shop-by-cat/shop-by-cat.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ShopSeriesComponent } from './shop-series/shop-series.component';
import { SeriesViewComponent } from './shop-series/series-view/series-view.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurPromiseComponent } from './our-promise/our-promise.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FaqPageComponent } from './faq-page/faq-page.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'shop/:category',
        component: ShopComponent
      },
      {
        path: 'shop-series',
        component: ShopSeriesComponent
      },
      {
        path: 'shop-series/:seriesId',
        component: SeriesViewComponent
      },
      {
        path: 'product/:url',
        component: ProductComponent
      },
      {
        path: 'email-verify/:token',
        component: EmailVerifyComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'our-promise',
        component: OurPromiseComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'faq',
        component: FaqPageComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
