import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';
import { LoginService } from '../../auth/login.service';
import { RfqModalComponent } from './rfq-modal/rfq-modal.component';
import { LoginPopupComponent } from 'src/app/auth/login-popup/login-popup.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { SampleRequestComponent } from './sample-request/sample-request.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;  
  productUrlSub: any;
  productCountry: string;
  product: {
    productInfo: any,
    customTabs: any,
    productSpecAttr: any,
    variants: any,
    relatedProducts: any,
    catInfo: any
  };
  bsModalRef: BsModalRef;
  productImgs: any;
  imgPath: string;
  isLoggedIn: boolean;

  sampleReqModal: BsModalRef;

  config = {
    animated: true,
    initialState: {},
    ignoreBackdropClick: true, 
    class: ''
  };

  sampleProduct: any;

  relatedProducts: any;


  constructor(private loginService: LoginService, private route: ActivatedRoute, private productService: ProductService, 
    private modalService: BsModalService, private snotifyService: SnotifyService, private router: Router) {}

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      login => {
        this.isLoggedIn = login;
      }
    )
    this.imgPath = environment.uploadedImgPath;
    
    this.productImgs = [];
    this.product = {
      productInfo: {},
      customTabs: [],
      productSpecAttr: {},
      variants: {},
      relatedProducts: {},
      catInfo: {}
    }

    this.productUrlSub = this.route.params.subscribe(params => {
      this.productImgs = [];
      this.product = {
        productInfo: {},
        customTabs: [],
        productSpecAttr: {},
        variants: {},
        relatedProducts: {},
        catInfo: {}
      }

      this.getProduct(params.url);
    });
  }

  getProduct(url: string) {
    if(this.bsModalRef) {
      this.bsModalRef.hide();
    }
    
    this.isLoading = true;
    this.productService.getProductByUrl(url).subscribe(
      product => {
        this.product.productInfo = product.product[0];
        this.product.catInfo = product.productCatInfo[0];
        this.product.customTabs = product.customTabs;
        this.product.productSpecAttr = product.productSpecAttr;
        this.product.variants = product.variants;
        this.product.relatedProducts = product.relatedProducts;        
        this.productImgGetter(product.product[0].product_imgs);
        this.getCountryName(this.product.productInfo.country);
        this.isLoading = false;        
      },
      (err) => {
        this.router.navigate(['/not-found']);
      }
    )
  }

  ngOnDestroy() {
    this.productUrlSub.unsubscribe();
  }
  
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  slideConfigNav = {"slidesToShow": 5, "slidesToScroll": 1, "asNavFor": '.carousel', "focusOnSelect": true};

  productImgGetter(imgString) {
    let imgList = imgString.split(",");
    if(imgList.length > 1) {
      imgList.forEach(img => {
        this.productImgs.push({img: `${img}`});
      });
    } else {
      this.productImgs.push({img: `${imgString}`});
    }    
  }

  openModalWithComponent(type) {
    if(this.isLoggedIn) {
      const userToken = this.loginService.getToken();
      const userType = jwt_decode(userToken).userType;

      if(userType === 1) {
        if(type === 'rfq') {
          this.config.class = 'modal-lg';
          this.config.initialState = { 
            productData: this.product
          };
          this.bsModalRef = this.modalService.show(RfqModalComponent, this.config);
        } else if(type === 'msg') {
          this.config.class = 'modal-lg';
          this.config.initialState = { 
            buyerData: jwt_decode(userToken),
            productData: this.product
          };
          this.bsModalRef = this.modalService.show(MessageBoxComponent, this.config);
        }
        
      } else {
        this.snotifyService.confirm('Only buyers can request for Quotes', '', {
          position: 'centerTop',
          buttons: [
            {text: 'Ok', action: (toast) => { this.snotifyService.remove(toast.id); }}
          ]
        });
      }

    } else {
      this.config.class = '';
      this.config.initialState = { 
        componentToOpen: RfqModalComponent,
        modalConfig: {
          initialState: {
            productData: this.product
          },
          class: 'modal-lg',
          ignoreBackdropClick: true
        }
      };
      this.bsModalRef = this.modalService.show(LoginPopupComponent, this.config);
    }    
  }

  getCountryName(countryCode: string) {
    this.productService.getCountryList(countryCode).subscribe(
      country => {
        this.productCountry = country;
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  requestSampleModal(product: any, sampleModal: TemplateRef<any>) {
    if(this.isLoggedIn) {
      this.config.class = 'modal-lg';
      this.config.initialState = { 
        productData: product
      };
      this.bsModalRef = this.modalService.show(SampleRequestComponent, this.config);      
    } else {
      this.config.class = '';
      this.config.initialState = { 
        componentToOpen: SampleRequestComponent,
        modalConfig: {
          initialState: {
            productData: product
          },
          class: 'modal-lg',
          ignoreBackdropClick: true
        }
      };
      this.bsModalRef = this.modalService.show(LoginPopupComponent, this.config);
    }    
  }
}

