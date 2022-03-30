import { Component, OnInit, Input } from '@angular/core';
import { ShopSidebarService } from './shop-sidebar.service';
import { ShopService } from '../shop.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shop-sidebar',
  templateUrl: './shop-sidebar.component.html',
  styleUrls: ['./shop-sidebar.component.scss'],
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
export class ShopSidebarComponent implements OnInit {
  catList: any;
  subCatList: any;
  catImgPath: string;
  filterParams: {
    categoryId: string,
    subCatIds: any,
    page: number
  };

  @Input() category: string;

  constructor(private shopSidebarService: ShopSidebarService, private shopService: ShopService) { }
  ngOnChanges() {
    if(this.category !== undefined) {
      this.filterParams = {
        categoryId: 'all',
        subCatIds: [],
        page: 10
      };
      this.filterParams.categoryId = this.category;
      this.getAllSubCats(this.filterParams.categoryId);
    }
  }

  ngOnInit() {
    this.catImgPath = environment.catIconImgPath;
    if(this.category !== undefined) {
      this.filterParams = {
        categoryId: this.category,
        subCatIds: [],
        page: 10
      };
      this.getAllSubCats(this.category);
    } else {
      this.filterParams = {
        categoryId: 'all',
        subCatIds: [],
        page: 10
      };
    }
    
    this.getAllCats();
  }

  getAllCats() {
    this.shopSidebarService.getAllCategories().subscribe(
      data => {
        this.catList = data;
      }
    )
  }

  getAllSubCats(catId) {
    this.filterParams = {
      categoryId: 'all',
      subCatIds: [],
      page: 10
    };
    this.filterParams.categoryId = catId;
    if(catId !== 'sustainable-products') {
      this.shopSidebarService.getAllSubCategories(catId).subscribe(
        data => {
          this.subCatList = data;
        }
      )
    } else {
      this.subCatList = [];
    }  
  }

  selectSubCats(subCatId) {
    if(!this.filterParams.subCatIds.includes(subCatId)) {
      this.filterParams.subCatIds.push(subCatId);
    } else {
      const itemIndex = this.filterParams.subCatIds.indexOf(subCatId);
      this.filterParams.subCatIds.splice(itemIndex, 1);
    }    
  }

  selectedSubCat(subCatId) {
    if(this.filterParams.subCatIds.includes(subCatId)) {
      return 'active';
    }    
  }

  filter() {
    this.shopSidebarService.updateFilter(this.filterParams);
  }

  resetCatFilter() {
    this.filterParams = {
      categoryId: 'all',
      subCatIds: [],
      page: 10
    };
    this.subCatList = [];
    this.shopSidebarService.updateFilter(this.filterParams);    
  }

  resetSubCatFilter() {
    this.filterParams.subCatIds = [];
    this.filterParams.page = 10;
    this.shopSidebarService.updateFilter(this.filterParams);
  }
}
