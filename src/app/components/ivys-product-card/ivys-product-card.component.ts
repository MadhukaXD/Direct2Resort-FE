import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ivys-product-card',
  templateUrl: './ivys-product-card.component.html',
  styleUrls: ['./ivys-product-card.component.scss']
})
export class IvysProductCardComponent implements OnInit {
  @Input() productName: string;
  @Input() permalink: string;
  @Input() productImg: string;
  productSingleImg: string;
  imgPath: string;

  constructor() { }

  ngOnInit() {
    this.imgPath = environment.uploadedImgPath;
    this.getFirstImg(this.productImg)
  }

  getFirstImg(imgs) {
    const imgSplit = imgs.split(",");

    if(imgSplit.length > 1){
      this.productSingleImg = `${this.imgPath}/${imgSplit[0]}`;
    } else {
      this.productSingleImg = `${this.imgPath}/${imgs}`;;
    }

    console.log(this.productSingleImg);
    
  }
}
