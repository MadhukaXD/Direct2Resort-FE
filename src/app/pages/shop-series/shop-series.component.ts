import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopSeriesService } from './shop-series.service';
import { ShopSeriesSidebarService } from './shop-series-sidebar/shop-series-sidebar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-series',
  templateUrl: './shop-series.component.html',
  styleUrls: ['./shop-series.component.scss']
})
export class ShopSeriesComponent implements OnInit {
  seriesList: any;
  filterData: any;
  subscriber: Subscription;
  isLoading = false;
  routeSub: Subscription;
  catId: string;
  constructor(private shopSeriesService: ShopSeriesService, private shopSeriesSidebarService: ShopSeriesSidebarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriber = this.shopSeriesSidebarService.currentFilter.subscribe(
      data => {
        this.filterData = data;
        this.getAllSeries();
      }
    )
  }

  getAllSeries() {
    this.isLoading = true;
    this.shopSeriesService.getFilteredSeriesList(this.filterData).subscribe(
      data => {
        this.isLoading = false;
        this.seriesList = data.data;      
      }
    )
  }

  ngOnDestroy() {
    this.shopSeriesSidebarService.updateFilter(
      {
        categoryId: 0,
        subCatIds: []
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
}
