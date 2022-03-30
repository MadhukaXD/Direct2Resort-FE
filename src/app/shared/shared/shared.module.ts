import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RouterModule } from '@angular/router';
import { Ng2LoadingSpinnerModule, ANIMATION_TYPES } from 'ng2-loading-spinner';
import { IvysHeaderComponent } from 'src/app/components/ivys-header/ivys-header.component';
import { IvysHeaderUserProfileComponent } from 'src/app/components/ivys-header-user-profile/ivys-header-user-profile.component';
import { IvysHeaderActionsComponent } from 'src/app/components/ivys-header-actions/ivys-header-actions.component';
import { IvysProductCardComponent } from 'src/app/components/ivys-product-card/ivys-product-card.component';
import { IvysRfqModalComponent } from 'src/app/components/ivys-rfq-modal/ivys-rfq-modal.component';
import { IvysHeaderLoginComponent } from 'src/app/components/ivys-header-login/ivys-header-login.component';
import { IvysHeaderSearchComponent } from 'src/app/components/ivys-header-search/ivys-header-search.component';
import { SearchHighlight } from 'src/app/_helpers/search-highlight.pipe';
import { IvysFooterComponent } from 'src/app/components/ivys-footer/ivys-footer.component';
import { IvysLpgAgreementComponent } from 'src/app/components/ivys-lpg-agreement/ivys-lpg-agreement.component';
import { IvysSeriesCardComponent } from 'src/app/components/ivys-series-card/ivys-series-card.component';
import { IvysSeriesListItemComponent } from 'src/app/components/ivys-series-list-item/ivys-series-list-item.component';
import { IvysBackToTopComponent } from 'src/app/components/ivys-back-to-top/ivys-back-to-top.component';
import { MomentModule } from 'ngx-moment';
import { IvysPageHeaderComponent } from 'src/app/components/ivys-page-header/ivys-page-header.component';
import { MyAccountComponent } from 'src/app/components/my-account/my-account.component';

@NgModule({
  declarations: [
    IvysHeaderComponent,
    IvysHeaderUserProfileComponent,
    IvysHeaderActionsComponent,
    IvysProductCardComponent,
    IvysRfqModalComponent,
    IvysHeaderLoginComponent,
    IvysHeaderSearchComponent,
    IvysFooterComponent,
    SearchHighlight,
    IvysLpgAgreementComponent,
    IvysSeriesCardComponent,
    IvysSeriesListItemComponent,
    IvysBackToTopComponent,
    IvysPageHeaderComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    PopoverModule.forRoot(),
    Ng2LoadingSpinnerModule.forRoot({
      animationType  : ANIMATION_TYPES.halfCircle
    }),
    MomentModule
  ],
  exports: [
    IvysHeaderComponent,
    IvysHeaderUserProfileComponent,
    IvysHeaderActionsComponent,
    IvysProductCardComponent,
    IvysRfqModalComponent,
    IvysHeaderLoginComponent,
    IvysHeaderSearchComponent,
    SearchHighlight,
    IvysFooterComponent,
    IvysLpgAgreementComponent,
    IvysSeriesCardComponent,
    IvysSeriesListItemComponent,
    IvysBackToTopComponent,
    IvysPageHeaderComponent,
    MyAccountComponent
  ]
})
export class SharedModule { }
