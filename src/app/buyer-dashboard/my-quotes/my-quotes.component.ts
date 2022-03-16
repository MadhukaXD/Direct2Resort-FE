import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyQuotesService } from './my-quotes.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss']
})
export class MyQuotesComponent implements OnInit, OnDestroy {
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  quoteList: any;
  isLoading: boolean;
  constructor(private myQuotesService: MyQuotesService, private route: ActivatedRoute) { }

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
    this.myQuotesService.getMyQuoteList().subscribe(
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
