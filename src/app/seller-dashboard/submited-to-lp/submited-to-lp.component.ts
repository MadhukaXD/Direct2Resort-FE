import { Component, OnInit } from '@angular/core';
import { SubmitedToLpService } from './submited-to-lp.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submited-to-lp',
  templateUrl: './submited-to-lp.component.html',
  styleUrls: ['./submited-to-lp.component.scss']
})
export class SubmitedToLpComponent implements OnInit {
  isLoading: boolean = false;
  quoteInfo: any;
  quoteSub: any;
  quoteProduct: any;
  quoteFreightData: any;
  quoteFreightTypeData: any;
  mainQuote: any;

  constructor(private submitedToLpService: SubmitedToLpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quoteProduct = [];
    this.loadAll();
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.getProduct(params.quoteId);
      this.getQuoteFreight(params.quoteId);
      this.getProductQuoteInstancebyQuote(params.quoteId);
    });
  }

  getProduct(quoteId: number) {
    this.isLoading = true;
    this.submitedToLpService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteInfo = data;  
        this.isLoading = false;      
      }
    )
  }

  getQuoteFreight(quoteId) {
    this.isLoading = true;
    this.submitedToLpService.getQuoteFreightData(quoteId).subscribe(
      data => {
        this.quoteFreightData = data;
        this.quoteFreightTypeData = JSON.parse(data.boxTypeData);   
        this.isLoading = false;     
      }
    )
  }

  getProductQuoteInstancebyQuote(quoteId) {
    this.isLoading = true;
    this.submitedToLpService.getProductQuoteInstancebyQuote(quoteId).subscribe(
      data => {
        this.quoteProduct = data.data.quotations[0].pricingProducts;
        this.mainQuote = data.data.quoteMain[0];
        this.isLoading = false;
      }
    )
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${environment.uploadedImgPath}/${firstImg[0]})`
    };
  }
}
