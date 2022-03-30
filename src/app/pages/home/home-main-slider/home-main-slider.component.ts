import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeMainSliderService } from './home-main-slider.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-main-slider',
  templateUrl: './home-main-slider.component.html',
  styleUrls: ['./home-main-slider.component.scss']
})
export class HomeMainSliderComponent implements OnInit {
  categoryList: any;
  catImgPath: string;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
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

  catList: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="apicon-arrow-left"></i>', '<i class="apicon-arrow-right"></i>'],
    items: 10,
    nav: false,
    responsive: {
      0: {
        items: 2
      },
      450: {
        items: 3
      },
      768: {
        items: 10
      }
    }
  }

  constructor(private homeMainSliderService: HomeMainSliderService) { }

  ngOnInit() {
    this.catImgPath = environment.catIconImgPath;
    this.getAllFeaturedPrdcts();
  }

  getAllFeaturedPrdcts() {
    this.homeMainSliderService.getCategoryList().subscribe(
      data => {
        this.categoryList = data;
      }
    )
  }
}
