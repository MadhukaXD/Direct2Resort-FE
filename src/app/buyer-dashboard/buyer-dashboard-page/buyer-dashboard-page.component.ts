import { Component, OnInit, TemplateRef } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BuyerDashboardPageService } from './buyer-dashboard-page.service';

@Component({
  selector: 'app-buyer-dashboard-page',
  templateUrl: './buyer-dashboard-page.component.html',
  styleUrls: ['./buyer-dashboard-page.component.scss']
})
export class BuyerDashboardPageComponent implements OnInit {
  modalRef: BsModalRef;
  quoteList: any;
  isLoading = false;

  constructor(private snotifyService: SnotifyService, private buyerDashboardPageService: BuyerDashboardPageService) {}  

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes(){
    this.isLoading = true;
    this.buyerDashboardPageService.getLpSubmitedQuotes().subscribe(
      data => {
        this.quoteList = data;  
        this.isLoading = false;      
      }
    )
  }

  confirmLsr(bidData) {
    this.snotifyService.confirm('If you wish to continue please click on confirm', '', {
      backdrop: 0.6,
      position: 'centerCenter',
      buttons: [
        {text: 'Cancel', action: (toast) => {console.log('Clicked: Later'); this.snotifyService.remove(toast.id); } },
        {
          text: 'Confirm', action: (toast) => {
            this.isLoading = true;
            this.buyerDashboardPageService.confirmLsr(bidData).subscribe(
              data => {
                this.isLoading = false;
                this.snotifyService.success('Confirmation success');
                this.getQuotes();     
              }
            );
            this.snotifyService.remove(toast.id);
          }
        },
      ]
    });
  }
}
