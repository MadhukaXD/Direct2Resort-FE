import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MyQuotesService } from './my-quotes.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss']
})
export class MyQuotesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  isLoading: boolean;

  selectedFilter: string;

  seriesQuoteList: any;
  constructor(private myQuotesService: MyQuotesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedFilter = 'all';
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };

    this.getQuoteInstancesBuyer();
  }

  getQuoteInstancesBuyer() {
    this.isLoading = true;
    this.myQuotesService.getQuoteQuoteInstancesBuyer(this.selectedFilter).subscribe(
      data => {
        this.isLoading = false;
        this.seriesQuoteList = data; 
        this.rerender();     
      }
    )
  }

  filterQuoteList(filter: string) {
    this.selectedFilter = filter;
    this.getQuoteInstancesBuyer();
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
