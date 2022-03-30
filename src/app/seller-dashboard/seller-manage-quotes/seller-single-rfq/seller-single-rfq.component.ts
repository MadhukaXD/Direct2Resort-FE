import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SellerSingleRfqService } from './seller-single-rfq.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-seller-single-rfq',
  templateUrl: './seller-single-rfq.component.html',
  styleUrls: ['./seller-single-rfq.component.scss']
})
export class SellerSingleRfqComponent implements OnInit {
  isLoading: boolean = false;

  quoteSub: Subscription;
  lastQuoteInstance: any;
  fullQuoteInstance: any;
  mainQuote: any;
  agreeToTerms: boolean = false;

  quote: {
    products: any,
    quoteRemark: string,
    total: number,
    series_instance_id: number,
    parent_quote_id: number,
    manufacture_leadtime: number,
    quote_uuid: string
  }
   
  discussionMsg: {
    quoteMessage: string,
    series_instance_id: number,
    quote_uuid: string
  }

  @ViewChild('scrollMsgFeed') private scrollMsgFeed: ElementRef;
  
  constructor(private sellerSingleRfqService: SellerSingleRfqService, private route: ActivatedRoute, private snotifyService: SnotifyService, private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.quote = {
      products: [],
      quoteRemark: '',
      total: 0,
      series_instance_id: 0,
      parent_quote_id: 0,
      manufacture_leadtime: 0,
      quote_uuid: ''
    }
    
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
    this.sellerSingleRfqService.getProductQuoteInstancebyQuote(quoteId).subscribe(
      quoteInstance => {
        this.lastQuoteInstance = quoteInstance.data.quotations[quoteInstance.data.quotations.length-1];
        this.fullQuoteInstance = quoteInstance.data.quotations;
        this.mainQuote = quoteInstance.data.quoteMain[0];
        this.discussionMsg.quote_uuid = this.mainQuote.quote_uuid;

        this.quote.series_instance_id = this.lastQuoteInstance.series_instance_id;
        this.discussionMsg.series_instance_id = this.lastQuoteInstance.series_instance_id;
        this.quote.parent_quote_id = this.lastQuoteInstance.SeriesQuote_ParentQuote_parent_quote_id;
        this.quote.quote_uuid = this.lastQuoteInstance.quote_uuid;

        if(this.quote.products.length === 0) {
          this.lastQuoteInstance.pricingProducts.forEach(product => {
            this.quote.products.push({            
              product_id: product.Product_product_id, 
              product_imgs: product.product_imgs,
              product_name: product.product_name,
              qty: product.quantity, 
              amount: (product.product_price * product.quantity), 
              unit_price: product.product_price.toFixed(2)
            });
          });
        }
        
        this.calcTotal(this.quote.products);
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

  calcTotalProductAmount(updatedProduct: any, unitPrice: string) {
    const pIndex = this.quote.products.findIndex((product) => product.product_id === updatedProduct.product_id);
    this.quote.products[pIndex].unit_price = parseFloat(unitPrice);
    this.quote.products[pIndex].amount = (parseFloat(unitPrice) * this.quote.products[pIndex].qty);
    this.calcTotal(this.quote.products);
  }

  calcTotal(productList: any) {
    this.quote.total = 0;    
    productList.forEach(product => {
      this.quote.total += (product.unit_price * product.qty);
    });    
  }

  submitQuote() {
    this.snotifyService.confirm('Are you sure you want to submit this quote? After submitting a quote you cannot undo and edit.', '', {
      closeOnClick: false,
      position: 'centerCenter',  
      backdrop: 0.6,    
      buttons: [
        {
          text: 'Yes', 
          action: (toast) => {
            this.snotifyService.remove(toast.id);
            this.isLoading = true;
            this.sellerSingleRfqService.sellerCreateQuoteInstance(this.quote).subscribe(
              data => {
                this.isLoading = false;
                if(data.status) {
                  this.quote.quoteRemark = '';
                  this.agreeToTerms = false;
                  this.snotifyService.success('Quote successfully submited');
                  this.loadAll();
                }
                    
              },
              (err) => {
                this.isLoading = false;                
                if(err.status = 500) {
                  this.snotifyService.confirm(err.error.message, '', {
                    closeOnClick: false,
                    position: 'centerCenter',  
                    backdrop: 0.6, 
                    type: 'error',
                    buttons: [
                      {
                        text: 'Ok', 
                        action: (toast) => {
                          this.snotifyService.remove(toast.id); 
                        }
                      }
                    ]   
                  })
                } else {
                  this.snotifyService.error('Something went wrong');
                }                
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

  sendMsg() {
    this.isLoading = true;
    this.sellerSingleRfqService.sendMessaageQuote(this.discussionMsg).subscribe(
      data => {
        this.discussionMsg.quoteMessage = '';
        this.snotifyService.success('Message sent');
        this.isLoading = false;
        this.loadAll();
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
      }
    )
  }

  markAsReadyToShip() {
    this.isLoading = true;
    this.sellerSingleRfqService.changeToReadyToShipQuery(this.mainQuote.series_quote_id).subscribe(
      data => {
        this.snotifyService.success('Quote is ready to ship');
        this.isLoading = false;
        this.router.navigate([`seller/shipping-manager/${this.quote.quote_uuid}`]);        
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
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
            this.sellerSingleRfqService.closeQuote(quote.quote_uuid).subscribe(
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
