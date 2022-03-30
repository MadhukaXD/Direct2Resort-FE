import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ivys-page-header',
  templateUrl: './ivys-page-header.component.html',
  styleUrls: ['./ivys-page-header.component.scss']
})
export class IvysPageHeaderComponent implements OnInit {
  @Input() bgImg: string;
  @Input() pageTitle: string;
  @Input() subTitle: string;

  constructor() { }

  ngOnInit() {
  }

  getBgImg() {
    return {'background-image': `url(${this.bgImg})`};
  }
}
