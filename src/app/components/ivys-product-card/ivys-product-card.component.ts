import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ivys-product-card',
  templateUrl: './ivys-product-card.component.html',
  styleUrls: ['./ivys-product-card.component.scss']
})
export class IvysProductCardComponent implements OnInit {
  @Input() isSeries: boolean = false;
  @Input() seriesUrl: string = null;
  @Input() productName: string;
  @Input() permalink: string;
  @Input() productImg: string;
  @Input() minOrderQty: string;
  @Input() productUnit: string;
  @Input() productCountry: string;
  productSingleImg: string;
  productHoverImg: string;
  imgPath: string;
  hoverStatus: boolean = false;
  routerLink: string;

  constructor() { }

  ngOnInit() {
    this.imgPath = environment.uploadedImgPath;
    this.getFirstImg(this.productImg); 
    
    if(this.isSeries) {
      this.routerLink = `/shop-series/${this.seriesUrl}`;
    } else {
      this.routerLink = `/product/${this.permalink}`;
    }
  }

  getFirstImg(imgs) {
    const imgSplit = imgs.split(",");

    if(imgSplit.length > 1){
      this.productSingleImg = `${imgSplit[0]}`;
      this.productHoverImg = `${imgSplit[1]}`;
    } else {
      this.productSingleImg = `${imgs}`;
    }    
  }

  imgMouseOver() {
    const imgsList = this.productImg.split(",");
    if(imgsList.length > 1) {
      this.hoverStatus = true;
    } else {
      this.hoverStatus = false;
    }
    
  }

  imgMouseOut() {
    this.hoverStatus = false;
  }
}
