import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageRfqService } from './manage-rfq.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { SnotifyService } from 'ng-snotify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.component.html',
  styleUrls: ['./manage-rfq.component.scss']
})
export class ManageRfqComponent implements OnInit {

  isLoading: boolean = false;
  isLoadingMinBid: boolean = false;

  quoteSub: Subscription;
  lastQuoteInstance: any;
  fullQuoteInstance: any;
  mainQuote: any;
  agreeToTerms: boolean = false;
   
  discussionMsg: {
    quoteMessage: string,
    series_instance_id: number,
    quote_uuid: string
  }

  minBid: any;
  seaFrieghtInvoice: any;
  airFrieghtInvoice: any;

  modalRef: BsModalRef;
  
  quoteRejectMsg: string;

  @ViewChild('scrollMsgFeed') private scrollMsgFeed: ElementRef;
  
  constructor(private manageRfqService: ManageRfqService, private route: ActivatedRoute, private snotifyService: SnotifyService,
    private modalService: BsModalService, private sharedService: SharedService) { }

  ngOnInit() {
    this.discussionMsg = {
      quoteMessage: '',
      series_instance_id: 0,
      quote_uuid: ''
    }

    this.loadAll();
  }
 
  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.getProductQuoteInstance(params.quoteId); 
      this.sharedService.clearNotifications({notification_type: 'QUOTE', typeId: params.quoteId}).subscribe();  
    });
  }

  getProductQuoteInstance(quoteId) {
    this.isLoading = true;
    this.manageRfqService.getProductQuoteInstancebyQuote(quoteId).subscribe(
      quoteInstance => {
        this.lastQuoteInstance = quoteInstance.data.quotations[quoteInstance.data.quotations.length-1];
        this.fullQuoteInstance = quoteInstance.data.quotations;
        this.discussionMsg.series_instance_id = this.lastQuoteInstance.series_instance_id;
        this.mainQuote = quoteInstance.data.quoteMain[0];
        this.discussionMsg.quote_uuid = this.mainQuote.quote_uuid;
        this.getMinBid(this.mainQuote.ParentQuote_parent_quote_id);
        this.isLoading = false;

        setTimeout(() => {
          this.msgFeedScrollToBottom();
        }, 100);
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }

  sendMsg() {
    this.isLoading = true;
    this.manageRfqService.sendMessaageQuote(this.discussionMsg).subscribe(
      data => {
        this.isLoading = false;
        if(data.status) {
          this.discussionMsg.quoteMessage = '';
          this.loadAll();
          this.snotifyService.success('Message Sent');          
        }           
      },
      (error) => {
        this.isLoading = false;
        this.loadAll();
        this.snotifyService.error('Something went wrong');
      }
    )
  }

  approveQuote(quote: any) {    
    this.isLoading = true;
    this.manageRfqService.buyerApproveQuoteFinal({quote_id: quote.quote_uuid, series_instance_id: quote.series_instance_id, 
      series_quote_id: quote.SeriesQuote_series_quote_id}).subscribe(
      data => {
        this.isLoading = false;
        this.loadAll();
        this.snotifyService.success('Quote approved');
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
      }
    )
  }

  getMinBid(parentQuoteId: number) {
    this.isLoadingMinBid = true;
    this.manageRfqService.getMinLpVal(parentQuoteId).subscribe(
      data => {
        this.minBid = data[0];   
        this.isLoadingMinBid = false;            
      },
      (error) => {
        this.isLoadingMinBid = false;
        console.log('Something went wrong');        
      }
    )
  }

  openLowestBidModal(template: TemplateRef<any>) {
    const airF = this.minBid.air_frieght_data_json;
    const seaF = this.minBid.sea_frieght_data_json;
    this.airFrieghtInvoice = JSON.parse(airF);
    this.seaFrieghtInvoice = JSON.parse(seaF);
    this.modalRef = this.modalService.show(template);
  }

  refreshBid() {
    this.getMinBid(this.mainQuote.ParentQuote_parent_quote_id);
  }

  openRejectForm(msg) {
    if(msg.rejectFormIsOpen) {
      msg.rejectFormIsOpen = false;
    } else {
      msg.rejectFormIsOpen = true;
    }
  }

  rejectQuote(qouteInstance: any) {
    this.isLoading = true;
    this.manageRfqService.rejectQuoteWithMsg({quoteRejectMessage: this.quoteRejectMsg, 
      quote_id: qouteInstance.quote_uuid, series_instance_id: qouteInstance.series_instance_id}).subscribe(
      data => {
        this.isLoading = false;
        this.snotifyService.success('Quote Rejected with Message', '');
        this.loadAll();
      },
      (err) => {
        this.isLoading = false;
        this.loadAll();
      }
    )
  }

  msgFeedScrollToBottom(): void {
    try {
        this.scrollMsgFeed.nativeElement.scrollTop = this.scrollMsgFeed.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  closeQuote(quote: any) { 
    this.snotifyService.confirm('Are you sure you want to close this quote?', '', {
      closeOnClick: false,
      position: 'centerCenter',  
      backdrop: 0.6,    
      buttons: [
        {
          text: 'Yes', 
          action: (toast) => {
            this.snotifyService.remove(toast.id);
            this.isLoading = true;

            this.manageRfqService.closeQuote(quote.quote_uuid).subscribe(
              data => {
                if(data.status) {
                  this.snotifyService.success('Successfully Closed the Quote');
                }
                this.isLoading = false;
                this.loadAll();
              }, 
              (err) => {
                this.isLoading = false;
                console.log(err);        
              }
            )           
          }        
        },
        { 
          text: 'No',
          action: (toast) => { this.snotifyService.remove(toast.id); }
        }
      ]
    }); 
  }
}
