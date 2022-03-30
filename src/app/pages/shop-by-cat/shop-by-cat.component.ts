import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopSidebarService } from '../shop/shop-sidebar/shop-sidebar.service';
import { ShopByCatService } from './shop-by-cat.service';

@Component({
  selector: 'app-shop-by-cat',
  templateUrl: './shop-by-cat.component.html',
  styleUrls: ['./shop-by-cat.component.scss']
})
export class ShopByCatComponent implements OnInit {
  productList: any;
  filterData: any;
  subscriber: Subscription;
  isLoading = true;
  constructor(private shopByCatService: ShopByCatService, private shopSidebarService: ShopSidebarService) { }

  ngOnInit() {
    this.subscriber = this.shopSidebarService.currentFilter.subscribe(
      data => {
        this.filterData = data;
        this.getAllProducts();
      }
    )
  }

  getAllProducts() {
    this.isLoading = true;
    this.shopByCatService.getFilteredProducts(this.filterData).subscribe(
      data => {
        this.isLoading = false;
        this.productList = data.data;      
      }
    )
  }

  ngOnDestroy() {
    this.shopSidebarService.updateFilter(
      {
        categoryId: 0,
        subCatIds: []
      } 
    );
    this.subscriber.unsubscribe();
  }
}
