import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellerManageQuotesService } from './seller-manage-quotes.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seller-manage-quotes',
  templateUrl: './seller-manage-quotes.component.html',
  styleUrls: ['./seller-manage-quotes.component.scss']
})
export class SellerManageQuotesComponent implements OnInit, OnDestroy {
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  quoteList: any;
  isLoading: boolean;
  
  constructor(private sellerManageQuotesService: SellerManageQuotesService) { }

  ngOnInit() {
    this.getMyQuotes();
  }

  getMyQuotes() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.isLoading = true;
    this.sellerManageQuotesService.getMyQuoteList().subscribe(
      quotes => {
        this.quoteList = quotes;
        this.isLoading = false;
        this.dtTrigger.next(quotes);
      }
      );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
