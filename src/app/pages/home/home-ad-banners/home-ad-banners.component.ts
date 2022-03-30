import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-ad-banners',
  templateUrl: './home-ad-banners.component.html',
  styleUrls: ['./home-ad-banners.component.scss']
})
export class HomeAdBannersComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="apicon-arrow-left"></i>', '<i class="apicon-arrow-right"></i>'],
    items: 1,
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  }
  constructor() { }

  ngOnInit() {
  }

}
