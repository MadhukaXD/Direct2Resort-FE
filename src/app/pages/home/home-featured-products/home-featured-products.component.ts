import { Component, OnInit } from '@angular/core';
import { HomeFeaturedProductsService } from './home-featured-products.service';
import { environment } from '../../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-featured-products',
  templateUrl: './home-featured-products.component.html',
  styleUrls: ['./home-featured-products.component.scss']
})
export class HomeFeaturedProductsComponent implements OnInit {
  featruedProductList: any;
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
  constructor(private homeFeaturedProductsService: HomeFeaturedProductsService) { }

  ngOnInit() {
    this.getAllFeaturedPrdcts();
  }

  getAllFeaturedPrdcts() {
    this.homeFeaturedProductsService.getFeaturedProducts().subscribe(
      data => {
        this.featruedProductList = data;
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
