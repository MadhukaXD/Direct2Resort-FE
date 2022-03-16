import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IvysRfqModalComponent } from '../../components/ivys-rfq-modal/ivys-rfq-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  productUrlSub: any;
  product: {
    productInfo: any,
    customTabs: any,
    productSpecAttr: any,
    variants: any
  };
  bsModalRef: BsModalRef;
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private modalService: BsModalService) {}

  ngOnInit() {
    this.product = {
      productInfo: {},
      customTabs: {},
      productSpecAttr: {},
      variants: {}
    }
    this.productUrlSub = this.route.params.subscribe(params => {
      console.log(params.url);
      this.getProduct(params.url);
    })
  }

  getProduct(url: string) {
    this.productService.getProductByUrl(url).subscribe(
      product => {
        this.product.productInfo = product.product[0];
        this.product.customTabs = product.customTabs;
        this.product.productSpecAttr = product.productSpecAttr;
        this.product.variants = product.variants;
      }
    )
  }

  requestForQuote(template: TemplateRef<any>) {
    console.log(this.product);    
    const initialState = {
      title: 'Modal with component',
      product: this.product
    };
    this.bsModalRef = this.modalService.show(IvysRfqModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    
  }

  ngOnDestroy() {
    this.productUrlSub.unsubscribe();
  }

  slides = [
    {img: "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  slideConfigNav = {"slidesToShow": 5, "slidesToScroll": 1, "asNavFor": '.carousel', "focusOnSelect": true};
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
}

