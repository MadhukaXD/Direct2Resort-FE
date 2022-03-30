import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { SeriesViewService } from './series-view.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IvysSeriesListItemService } from 'src/app/components/ivys-series-list-item/ivys-series-list-item.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/auth/login.service';
import * as jwt_decode from 'jwt-decode';
import { SnotifyService } from 'ng-snotify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SeriesRfqModalComponent } from './series-rfq-modal/series-rfq-modal.component';
import { Subscription } from 'rxjs';
import { RfqModalComponent } from '../../product/rfq-modal/rfq-modal.component';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { SeriesRfqModalService } from './series-rfq-modal/series-rfq-modal.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-series-view',
  templateUrl: './series-view.component.html',
  styleUrls: ['./series-view.component.scss']
})
export class SeriesViewComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  isLoading: boolean = false;
  routeSub: any;
  productList: any;
  productSeriesInfo: any;

  cart: any;
  cartSubscriber: Subscription;
  cartStatusSubscription: Subscription;
  productSingleImg: string;
  imgPath: string;
  bsModalRef: BsModalRef;

  config = {
    animated: true,
    initialState: {},
    ignoreBackdropClick: true, 
    class: ''
  };
 
  cartBottom: string;
  isCartOpen: boolean = true;

  @ViewChild('rfqCart') rfqCart: ElementRef;
  
  constructor(private seriesViewService: SeriesViewService, private route: ActivatedRoute, 
    private ivysSeriesListItemService: IvysSeriesListItemService, private loginService: LoginService,
    private snotifyService: SnotifyService, private modalService: BsModalService,
    private seriesRfqModalService: SeriesRfqModalService,
    private router: Router) { }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      login => {
        this.isLoggedIn = login;
      }
    )
    this.imgPath = environment.uploadedImgPath;
    this.cart = [];
    this.routeSub = this.route.params.subscribe(params => {
      this.getProductSeriesInfo(params.seriesId);      
    });

    this.updateCart();
    this.checkIfRfqSubmited();

    this.router.events.subscribe((val) => {
      this.cart = [];
    });
  }

  updateCart() {
    this.cartSubscriber = this.ivysSeriesListItemService.currentCart.subscribe(cartItem => { 
      if(cartItem.product !== null) {
        const checkIfHasItem = this.cart.findIndex(cart => cart.product.product_id == cartItem.product.product_id);
        if(checkIfHasItem === -1) {
          this.cart.push(cartItem);
          
          if(!this.isCartOpen) {
            this.toggleCart();
          }
        } else {
          this.snotifyService.confirm('This item is already in the cart', '', {
            position: 'centerTop',
            buttons: [
              {text: 'Ok', action: (toast) => { console.log('Clicked: Later'); this.snotifyService.remove(toast.id); }}
            ]
          });       
        }
      }
    });
  }

  checkIfRfqSubmited() {
    this.cartStatusSubscription = this.seriesRfqModalService.cartStatus.subscribe(rfqStatus => {      
      if(rfqStatus.status) {
        this.cart = [];      
      }
    });
  }

  getProducts(seriesId) {
    this.isLoading = true;
    this.seriesViewService.getProductSeriesSingle(seriesId).subscribe(products => {
      this.productList = products;
      this.isLoading = false;
    })
  }

  getProductSeriesInfo(seriesId) {
    this.isLoading = true;
    this.seriesViewService.getProductSeriesRefDetails(seriesId).subscribe(info => {
      this.productSeriesInfo = info; 
      this.isLoading = false;  
      this.getProducts(seriesId);   
    },
    (err) => {
      this.router.navigate(['/not-found']);
    })
  }

  getFirstImg(imgs) {
    const imgSplit = imgs.split(",");
    if(imgSplit.length > 1){
      return `${imgSplit[0]}`;
    } else {
      return `${imgs}`;
    }    
  }

  removeCartItem(cartItem: any) {
    const removeIndex = this.cart.findIndex(cart => cart.product.product_id == cartItem.product.product_id);
    this.cart.splice(removeIndex, 1);    
  }

  seriesRfq() {
    if(this.isLoggedIn) {
      const userToken = this.loginService.getToken();
      const userType = jwt_decode(userToken).userType;
      
      if(userType === 1) {
        this.config.class = 'modal-lg';
        this.config.initialState = { 
          productData: this.cart,
          companyId: this.productSeriesInfo.company_id
        };        
        this.bsModalRef = this.modalService.show(SeriesRfqModalComponent, this.config);
      } else {
        this.snotifyService.confirm('Only buyers can request for Quotes', '', {
          position: 'centerTop',
          buttons: [
            {text: 'Ok', action: (toast) => { console.log('Clicked: Later'); this.snotifyService.remove(toast.id); }}
          ]
        });
      }
    } else {
      this.config.class = '';
      this.config.initialState = { 
        componentToOpen: SeriesRfqModalComponent,
        modalConfig: {
          initialState: {
            productData: this.cart,
            companyId: this.productSeriesInfo.company_id
          },
          class: 'modal-lg',
          ignoreBackdropClick: true
        }
      };
      this.bsModalRef = this.modalService.show(LoginPopupComponent, this.config);
    }
  }

  toggleCart() {
    let toBottom = (this.rfqCart.nativeElement.offsetHeight - 45);
    if(this.isCartOpen) {
      this.isCartOpen = false;
      this.cartBottom = `-${toBottom}px`;
    } else {      
      this.isCartOpen = true;
      this.cartBottom = `0`;
    }    
  }

  ngOnDestroy() {  
    if(this.bsModalRef) {
      this.bsModalRef.hide(); 
    }    
    this.cartSubscriber.unsubscribe();
    this.seriesRfqModalService.rfqStatus({status: false});
    this.cartStatusSubscription.unsubscribe();
  }
}
