import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from './shop.service';
import { ShopSidebarService } from './shop-sidebar/shop-sidebar.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.8s ease-out', 
                    style({  opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class ShopComponent implements OnInit, OnDestroy {
  productList: any;
  productSeriesList: any;
  filterData: any;
  subscriber: Subscription;
  isLoading = true;
  routeSub: Subscription;
  catId: string;

  loadPage: number = 10;
  constructor(private shopService: ShopService, private shopSidebarService: ShopSidebarService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {    
    this.routeSub = this.route.params.subscribe(params => {
      //this.catId = params.category;
      if(params.category !== undefined) {
        this.catId = params.category;
        const filterParams = {
          categoryId: this.catId,
          subCatIds: []
        };
        console.log(filterParams);
        
        this.shopSidebarService.updateFilter(filterParams);
      }      
    });

    this.subscriber = this.shopSidebarService.currentFilter.subscribe(
      data => {
        this.filterData = data;
        this.getAllProducts();
      }
    )
  }

  getAllProducts() {
    this.filterData.page = this.loadPage;
    this.isLoading = true;
    this.shopService.getFilteredProducts(this.filterData).subscribe(
      data => {
        this.isLoading = false;
        this.productList = data.product; 
        this.productSeriesList = data.productSeries;    
      }
    )
  }

  ngOnDestroy() {
    this.shopSidebarService.updateFilter(
      {
        categoryId: 'all',
        subCatIds: [],
        page: 10
      } 
    );
    this.subscriber.unsubscribe();
  }

  menuToggle(e) {
    console.log(e);
    if(e.srcElement.parentElement.classList.contains('closed')){
      e.srcElement.parentElement.classList.remove('closed');
      e.srcElement.parentElement.classList.add('opened');
    } else {
      e.srcElement.parentElement.classList.remove('opened');
      e.srcElement.parentElement.classList.add('closed');
    }
  }

  loadMore() {
    this.loadPage = this.loadPage + 10;
    this.filterData.page = this.loadPage;
    this.getAllProducts();    
  }

  isSeries(product: any) {
    if(product.product_series_url !== null) {
      return true;
    } else {
      return false;
    }
  }
}
