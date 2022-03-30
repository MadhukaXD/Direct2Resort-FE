import { Component, OnInit } from '@angular/core';
import { LogisticPartnerDashboardService } from './logistic-partner-dashboard.service';

@Component({
  selector: 'app-logistic-partner-dashboard',
  templateUrl: './logistic-partner-dashboard.component.html',
  styleUrls: ['./logistic-partner-dashboard.component.scss']
})
export class LogisticPartnerDashboardComponent implements OnInit {
  isLoading: boolean = false;
  availableQuoteList: any;
  today = new Date();
  constructor(private logisticPartnerDashboardService: LogisticPartnerDashboardService) { }

  ngOnInit() {    
    this.getAvailableQuoteList();
  }

  getAvailableQuoteList() {
    this.isLoading = true;
    this.logisticPartnerDashboardService.getQuoteFrightForLPList().subscribe(
      data => {
        this.isLoading = false;
        this.availableQuoteList = data;
      },
      (err) => {
        this.isLoading = false;
      }
    )
  }
}
