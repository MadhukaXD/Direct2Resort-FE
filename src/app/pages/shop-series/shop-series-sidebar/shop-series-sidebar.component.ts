import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ShopSeriesSidebarService } from './shop-series-sidebar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-series-sidebar',
  templateUrl: './shop-series-sidebar.component.html',
  styleUrls: ['./shop-series-sidebar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('1s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('1s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ShopSeriesSidebarComponent implements OnInit {
  catList: any;
  subCatList: any;
  catImgPath: string;
  filterParams: {
    categoryId: number
  };


  constructor(private shopSeriesSidebarService: ShopSeriesSidebarService) { }


  ngOnInit() {
    this.catImgPath = environment.catIconImgPath;
    this.filterParams = {
      categoryId: 0
    };    
    this.getAllCats();
  }

  getAllCats() {
    this.shopSeriesSidebarService.getAllCategories().subscribe(
      data => {
        this.catList = data;
        console.log(data);
      }
    )
  }

  selectCategory(catId) {
    this.filterParams.categoryId = catId;
  }

  filter() {
    this.shopSeriesSidebarService.updateFilter(this.filterParams);
  }
}
