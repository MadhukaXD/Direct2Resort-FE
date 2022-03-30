import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SellerProductSingleService } from './seller-product-single.service';

@Component({
  selector: 'app-seller-product-single',
  templateUrl: './seller-product-single.component.html',
  styleUrls: ['./seller-product-single.component.scss']
})
export class SellerProductSingleComponent implements OnInit {
  isLoading: boolean = false;  
  productUrlSub: any;
  product: {
    productInfo: any,
    customTabs: any,
    productSpecAttr: any,
    variants: any,
    relatedProducts: any
  };
  productImgs: any;
  imgPath: string;
  isLoggedIn: boolean;

  productCountry: string;

  config = {
    animated: true,
    initialState: {},
    ignoreBackdropClick: true, 
    class: ''
  };

  relatedProducts: any;

  constructor( private route: ActivatedRoute, private pellerProductSingleService: SellerProductSingleService, private router: Router) {}

  ngOnInit() {

    this.imgPath = environment.uploadedImgPath;
    
    this.productImgs = [];
    this.product = {
      productInfo: {},
      customTabs: [],
      productSpecAttr: {},
      variants: {},
      relatedProducts: {}
    }

    this.productUrlSub = this.route.params.subscribe(params => {
      this.productImgs = [];
      this.product = {
        productInfo: {},
        customTabs: [],
        productSpecAttr: {},
        variants: {},
        relatedProducts: {}
      }

      this.getProduct(params.url);
    })
  }

  getProduct(url: string) {
    this.isLoading = true;
    this.pellerProductSingleService.getProductByUrl(url).subscribe(
      product => {
        this.product.productInfo = product.product[0];
        this.product.customTabs = product.customTabs;
        this.product.productSpecAttr = product.productSpecAttr;
        this.product.variants = product.variants;
        this.product.relatedProducts = product.relatedProducts;        
        this.productImgGetter(product.product[0].product_imgs);
        this.getCountryName(product.product[0].country);
        this.isLoading = false;        
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

  getCountryName(countryCode: string) {
    this.pellerProductSingleService.getCountryList(countryCode).subscribe(
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
}
