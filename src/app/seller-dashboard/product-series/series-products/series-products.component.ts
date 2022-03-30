import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesProductsService } from './series-products.service';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-series-products',
  templateUrl: './series-products.component.html',
  styleUrls: ['./series-products.component.scss']
})
export class SeriesProductsComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  routeSub: any;
  productList: any;
  refInfo: any;

  constructor(private route: ActivatedRoute, private seriesProductsService: SeriesProductsService) { }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.routeSub = this.route.params.subscribe(params => {
      this.getProductSeriesRefInfo(params.seriesRefId);
      this.getProductList(params.seriesRefId);
    });
  }

  getProductList(seriesRefId: number) {
    this.isLoading = true;
    this.seriesProductsService.getProductList(seriesRefId).subscribe(productList => {
      this.isLoading = false;
      this.productList = productList;
      this.rerender();
    })
  }

  getProductSeriesRefInfo(seriesRefId: number) {
    this.seriesProductsService.getProductSeriesRefDetails(seriesRefId).subscribe(psRefData => {
      this.refInfo = psRefData;
    })
  }

  getProductImg(imgs) {
    const productImg = imgs.split(',')[0];
    let styles = {
      'background-image': 'url('+productImg+')'
    };    
    return styles;    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
