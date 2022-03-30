import { Component, OnInit } from '@angular/core';
import { SellerQuoteManagementService } from './seller-quote-management.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-seller-quote-management',
  templateUrl: './seller-quote-management.component.html',
  styleUrls: ['./seller-quote-management.component.scss']
})
export class SellerQuoteManagementComponent implements OnInit {
  quoteInfo: any;
  quoteSub: any;
  quantity: number;
  quoteInstance: any;
  agreeToTerms: boolean = false;
  sellerMsg: {
    Quotes_quote_id: string,
    quote_instance_id: string,
    seller_msg: string,
    seller_price: number,
    seller_unit_price: number
  }
  isLoading: boolean;
  quoteProduct: {
    product_name: string,
    quantity: string,
    product_imgs: string,
    product_single_img: string
  };
  imgUploadPath: string;
  qiId: string;
  lastQuoteInstance: any;
  editQuote: boolean = false;
  
  constructor(private sellerQuoteManagementService: SellerQuoteManagementService, private route: ActivatedRoute, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.sellerMsg = {
      Quotes_quote_id: '',
      quote_instance_id: '',
      seller_price: 0,
      seller_msg: '',
      seller_unit_price: 0
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
    this.imgUploadPath = environment.uploadedImgPath;
    this.loadAll();    
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.sellerMsg.Quotes_quote_id = params.quoteId;
      this.getProduct(params.quoteId);
      this.getLastQId(params.quoteId);
      this.getQuote(params.quoteId);
      this.getQuoteInstance(params.quoteId);          
    });
  }

  getQuote(quoteId){
    this.isLoading = true;
    this.sellerQuoteManagementService.getQuote(quoteId).subscribe(
      data => {
        this.quoteInfo = data;
        this.isLoading = false;
      }
    )
  }

  getQuoteInstance(quoteId){
    this.isLoading = true;
    this.sellerQuoteManagementService.getQuoteInstanceDetails(quoteId).subscribe(
      data => {
        this.quoteInstance = data;
        this.lastQuoteInstance = data[data.length - 1];
        
        for (let index = 0; index < data.length; index++) {
          if(index === data.length-1) {
            this.quantity = data[index].quantity;
            this.sellerMsg.seller_price = (this.quantity * this.sellerMsg.seller_unit_price);
          }          
        }     
        this.isLoading = false; 
      }
    )
  }

  getProduct(quoteId: number) {
    this.sellerQuoteManagementService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteProduct = data;
        this.sellerMsg.seller_unit_price = data.product_price; 
      }
    )
  }

  sendMsg() {
    if(Math.sign(this.sellerMsg.seller_unit_price) === 1) {
      this.sellerMsg.quote_instance_id = this.qiId;
      this.sellerQuoteManagementService.sendMsgToSeller(this.sellerMsg).subscribe(
        data => {
          console.log(data);
          this.loadAll();
          this.agreeToTerms = false;
          this.sellerMsg.seller_msg = ''
          this.editQuote = false;
        }
      )
    } else {
      this.snotifyService.error('Please enter valid unit price', 'Error');
    }
  }

  calcTotalAmount() {
    this.sellerMsg.seller_price = (parseInt(this.quoteProduct.quantity) * this.sellerMsg.seller_unit_price);   
  }

  getLastQId(quoteId: number) {
    this.sellerQuoteManagementService.getLastQuoteInstanceId(quoteId).subscribe(qiId => this.qiId = qiId.quote_instance_id);
  }

  readyToShip() {
    this.sellerQuoteManagementService.updateReadyToShipStatus(this.sellerMsg.Quotes_quote_id).subscribe(
      data => {
        console.log(data);        
      }
    )
  }

  editResponse() {
    this.editQuote = true;
  }

  ngOnDestroy() {
    this.quoteSub.unsubscribe();
  }

  ngAfterViewChecked() {
    this.calcTotalAmount();
  }
}
