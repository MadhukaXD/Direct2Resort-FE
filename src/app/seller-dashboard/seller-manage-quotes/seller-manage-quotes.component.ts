import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SellerManageQuotesService } from './seller-manage-quotes.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-seller-manage-quotes',
  templateUrl: './seller-manage-quotes.component.html',
  styleUrls: ['./seller-manage-quotes.component.scss']
})
export class SellerManageQuotesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  quoteList: any;
  isLoading: boolean;
  
  sellerQuoteList: any;

  selectedFilter: string;

  constructor(private sellerManageQuotesService: SellerManageQuotesService) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.getQuoteQuoteInstancesSeller();
  }

  getQuoteQuoteInstancesSeller() {
    this.isLoading = true;
    this.sellerManageQuotesService.getQuoteQuoteInstancesSellerQuery(this.selectedFilter).subscribe(
      data => {
        this.isLoading = false;
        this.sellerQuoteList = data;  
        this.rerender();     
      }
    )
  }

  filterQuoteList(filter: string) {
    this.selectedFilter = filter;
    this.getQuoteQuoteInstancesSeller();
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
