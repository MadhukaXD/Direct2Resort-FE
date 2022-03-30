import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-related-products',
  templateUrl: './product-related-products.component.html',
  styleUrls: ['./product-related-products.component.scss']
})
export class ProductRelatedProductsComponent implements OnInit {
  @Input() relatedProducts: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="apicon-arrow-left"></i>', '<i class="apicon-arrow-right"></i>'],
    items: 5,
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    margin: 30,
    stagePadding: 10,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 4
      },
      1366: {
        items: 5
      }
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
