import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IvysSeriesListItemService } from './ivys-series-list-item.service';

@Component({
  selector: 'app-ivys-series-list-item',
  templateUrl: './ivys-series-list-item.component.html',
  styleUrls: ['./ivys-series-list-item.component.scss']
})
export class IvysSeriesListItemComponent implements OnInit, OnDestroy {
  @Input() product: any;
  @Input() productName: string;
  @Input() productPrice: string;
  @Input() productImgList: string;
  @Input() permalink: string;
  @Input() minOrderQty: string;
  @Input() productUnit: string;
  
  productQty: string = '0';
  productCartItem: {
    product: any,
    qty: any
  };
  productSingleImg: string;
  imgPath: string;

  constructor(private ivysSeriesListItemService: IvysSeriesListItemService) { }

  ngOnInit() {
    this.imgPath = environment.uploadedImgPath;
    this.getFirstImg(this.productImgList) 
  }

  getFirstImg(imgs) {
    const imgSplit = imgs.split(",");
    if(imgSplit.length > 1){
      this.productSingleImg = `${imgSplit[0]}`;
    } else {
      this.productSingleImg = `${imgs}`;;
    }    
  }

  addToCart(product: any) {
    if(this.productQty !== undefined && this.productQty !== '0') {
      this.productCartItem = {
        product: product,
        qty: this.productQty
      }
      this.ivysSeriesListItemService.updateCart(this.productCartItem);
    }    
  }

  ngOnDestroy() {
    this.productCartItem = {
      product: null,
      qty: 0
    }
    this.ivysSeriesListItemService.updateCart(this.productCartItem);
  }
}
