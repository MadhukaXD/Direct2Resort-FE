import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuyerManageQuoteService } from './buyer-manage-quote.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-buyer-manage-quote',
  templateUrl: './buyer-manage-quote.component.html',
  styleUrls: ['./buyer-manage-quote.component.scss']
})
export class BuyerManageQuoteComponent implements OnInit, OnDestroy {
  isLoadinggetQuote: boolean = false;
  isLoadingGetProducts: boolean = false;
  isLoadinggetQuoteInstance: boolean = false;
  isLoadingSendMsg: boolean = false;
  isLoadingApproveQuote: boolean = false;

  quoteInfo: any;
  quoteSub: any;
  quantity: number;
  quoteInstance: any;
  agreeToTerms: boolean = false;
  buyerMsg: {
    Quotes_quote_id: string,
    buyer_msg: string
  }
  
  imgUploadPath: string;
  quoteProduct: {
    product_name: string,
    quantity: string,
    product_imgs: string,
    product_single_img: string
  };
  lastQuoteInstance: any;

  constructor(private buyerManageQuoteService: BuyerManageQuoteService, private route: ActivatedRoute, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.imgUploadPath = environment.uploadedImgPath;

    this.buyerMsg = {
      Quotes_quote_id: '',
      buyer_msg: ''
    }
    this.quoteInfo = {
      quote_id: ''
    }
    this.quoteProduct = {
      product_name: '',
      quantity: '',
      product_imgs: '',
      product_single_img: ''
    }
    this.loadAll();    
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.buyerMsg.Quotes_quote_id = params.quoteId;
      this.getProduct(params.quoteId);
      this.getQuote(params.quoteId);
      this.getQuoteInstance(params.quoteId);
    });
  }

  getQuote(quoteId){
    this.isLoadinggetQuote = true;
    this.buyerManageQuoteService.getQuote(quoteId).subscribe(
      data => {
        this.quoteInfo = data;
        this.isLoadinggetQuote = false;
      }
    )
  }

  getQuoteInstance(quoteId){
    this.isLoadinggetQuoteInstance = true;
    this.buyerManageQuoteService.getQuoteInstanceDetails(quoteId).subscribe(
      data => {
        this.quoteInstance = data;
        this.lastQuoteInstance = data[data.length - 1];
        this.isLoadinggetQuoteInstance = false; 
      }
    )
  }

  sendMsg() {
    this.isLoadingSendMsg = true;
    this.buyerManageQuoteService.sendMsgToSeller(this.buyerMsg).subscribe(
      data => {
        console.log(data);
        this.loadAll();
        this.agreeToTerms = false;
        this.buyerMsg.buyer_msg = ''; 
        this.isLoadingSendMsg = false;  
      }
    )
  }

  getProduct(quoteId: number) {
    this.isLoadingGetProducts = true;
    this.buyerManageQuoteService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteProduct = data;
        this.isLoadingGetProducts = false;
      }
    )
  }

  approveQuote(qInstance) {  
    this.isLoadingApproveQuote = true;
    const quoteObj = { 
      approved_quote_instance_id: qInstance.quote_instance_id, 
      status: 'Approved',
      quote_id: qInstance.Quotes_quote_id
    };
    this.buyerManageQuoteService.updateClientApproval(quoteObj).subscribe(
      data => {
        this.loadAll(); 
        this.isLoadingApproveQuote = false;     
      },
      (error) => {
        this.snotifyService.error(error.statusText);
        this.isLoadingApproveQuote = false;
      }
    )
  }

  rejectQuoteInstance(quoteInstance) {
    this.isLoadingApproveQuote = true;
    const instanceData = {
      quoteId: quoteInstance.Quotes_quote_id,
      quoteInstanceId: quoteInstance.quote_instance_id
    }
    this.buyerManageQuoteService.rejectQuoteInstance(instanceData).subscribe(
      data => {
        this.isLoadingApproveQuote = false;
        this.loadAll();
        this.snotifyService.success('Successfully rejected');  
      },
      (error) => {
        this.snotifyService.error(error.statusText);
        this.isLoadingApproveQuote = false;
      }
    )
  }

  ngOnDestroy() {
    this.quoteSub.unsubscribe();
  }
}
