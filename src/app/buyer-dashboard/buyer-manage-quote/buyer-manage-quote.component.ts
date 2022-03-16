import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuyerManageQuoteService } from './buyer-manage-quote.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-buyer-manage-quote',
  templateUrl: './buyer-manage-quote.component.html',
  styleUrls: ['./buyer-manage-quote.component.scss']
})
export class BuyerManageQuoteComponent implements OnInit, OnDestroy {
  quoteInfo: any;
  quoteSub: any;
  quantity: number;
  quoteInstance: any;
  agreeToTerms: boolean = false;
  buyerMsg: {
    Quotes_quote_id: string,
    buyer_msg: string
  }
  isLoading: boolean;
  imgUploadPath: string;
  quoteProduct: {
    product_name: string,
    quantity: string,
    product_imgs: string,
    product_single_img: string
  };
  constructor(private buyerManageQuoteService: BuyerManageQuoteService, private route: ActivatedRoute) { }

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
    this.isLoading = true;
    this.buyerManageQuoteService.getQuote(quoteId).subscribe(
      data => {
        this.quoteInfo = data;
        this.isLoading = false;
      }
    )
  }

  getQuoteInstance(quoteId){
    this.isLoading = true;
    this.buyerManageQuoteService.getQuoteInstanceDetails(quoteId).subscribe(
      data => {
        this.quoteInstance = data;
        this.isLoading = false; 
      }
    )
  }

  sendMsg() {
    this.buyerManageQuoteService.sendMsgToSeller(this.buyerMsg).subscribe(
      data => {
        console.log(data);
        this.loadAll();
        this.agreeToTerms = false;
        this.buyerMsg.buyer_msg = '';   
      }
    )
  }

  getProduct(quoteId: number) {
    this.buyerManageQuoteService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteProduct = data;
      }
    )
  }

  ngOnDestroy() {
    this.quoteSub.unsubscribe();
  }
}
