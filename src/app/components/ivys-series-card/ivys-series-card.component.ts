import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ivys-series-card',
  templateUrl: './ivys-series-card.component.html',
  styleUrls: ['./ivys-series-card.component.scss']
})
export class IvysSeriesCardComponent implements OnInit {
  @Input() productName: string;
  @Input() productImg: string;
  @Input() seriesUrl: string;
  
  productSingleImg: string;
  imgPath: string;

  constructor() { }

  ngOnInit() {
    this.imgPath = environment.productSeriesBannerPath;
    this.getFirstImg(this.productImg);
  }

  getFirstImg(imgs) {
    if(imgs !== null) {
      const imgSplit = imgs.split(",");
      if(imgSplit.length > 1){
        this.productSingleImg = `${imgSplit[0]}`;
      } else {
        this.productSingleImg = `${imgs}`;
      }  
    } else {
      this.productSingleImg = '';
    }      
  }
}
