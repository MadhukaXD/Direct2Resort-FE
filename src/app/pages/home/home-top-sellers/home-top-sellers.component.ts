import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeTopSellersService } from './home-top-sellers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-top-sellers',
  templateUrl: './home-top-sellers.component.html',
  styleUrls: ['./home-top-sellers.component.scss']
})
export class HomeTopSellersComponent implements OnInit {
  topProductList: any;
  isSeriesProduct: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="apicon-arrow-left"></i>', '<i class="apicon-arrow-right"></i>'],
    items: 5,
    nav: false,
    margin: 60,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 4
      }
    }
  }
  
  constructor(private homeTopSellersService: HomeTopSellersService) { }

  ngOnInit() {
    this.getAllFeaturedPrdcts();
  }

  getAllFeaturedPrdcts() {
    this.homeTopSellersService.getTopSellerProducts().subscribe(
      data => {
        this.topProductList = data;
      }
    )
  }

  getProductImg(imgs) {
    const productImg = imgs.split(',')[0];
    let styles = {
      'background-image': 'url('+productImg+')'
    };    
    return styles;    
  }

  isSeries(product: any) {
    if(product.product_series_url !== null) {
      this.isSeriesProduct = true;
      return `/shop-series/${product.product_series_url}`;
    } else {
      this.isSeriesProduct = false;
      return `/product/${product.product_url}`;
    }
  }
}
