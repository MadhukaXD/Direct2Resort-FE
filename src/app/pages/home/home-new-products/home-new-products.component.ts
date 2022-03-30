import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeNewProductsService } from './home-new-products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-new-products',
  templateUrl: './home-new-products.component.html',
  styleUrls: ['./home-new-products.component.scss']
})
export class HomeNewProductsComponent implements OnInit {
  newProductList: any;
  isSeriesProduct: boolean = false;
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [],
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

  constructor(private homeNewProductsService: HomeNewProductsService) { }


  ngOnInit() {
    this.getAllNewPrdcts();
  }

  getAllNewPrdcts() {
    this.homeNewProductsService.getNewProducts().subscribe(
      data => {
        this.newProductList = data;
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
