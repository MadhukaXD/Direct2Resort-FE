import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadyToShipManageService } from './ready-to-ship-manage.service';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-ready-to-ship-manage',
  templateUrl: './ready-to-ship-manage.component.html',
  styleUrls: ['./ready-to-ship-manage.component.scss']
})
export class ReadyToShipManageComponent implements OnInit {
  isLoading: boolean = false;
  quoteSub: any;
  quoteInfo: any;
  imgUploadPath: string;
  quoteProduct: any;

  shippingData: {
    Quotes_quote_id: string,
    origin: string,
    destination: string,
    boxType: string,
    sellerMsg: string,
    boxTypeData: any
  }

  shippingDataContainer: {
    units: string,
    size: string
  }

  boxesData: {
    units: string,
    volume: string,
    volumeMessure: string,
    weight: string,
    wieghtMessure: string
  }

  shippingBoxType: any;
  
  constructor(private route: ActivatedRoute, private readyToShipManageService: ReadyToShipManageService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.shippingBoxType = [{type: 'Container'},{type: 'Boxes'},{type: 'Pallets'}];
    this.shippingData = {
      Quotes_quote_id: '',
      boxType: 'Container',
      origin: '',
      destination: '',
      sellerMsg: '',
      boxTypeData: {}
    }

    this.shippingDataContainer = {
      units: '',
      size: ''
    }
  
    this.boxesData = {
      units: '',
      volume: '',
      volumeMessure: 'CBM',
      weight: '',
      wieghtMessure: 'Kg'
    }

    this.loadAll();
    this.imgUploadPath = environment.uploadedImgPath;
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.shippingData.Quotes_quote_id = params.quoteId;
      this.getQuote(params.quoteId);
      this.getProduct(params.quoteId);      
    });
  }

  getQuote(quoteId){
    this.isLoading = true;
    this.readyToShipManageService.getQuote(quoteId).subscribe(
      data => {
        this.quoteInfo = data;
        this.isLoading = false;
        console.log(data);
        
      }
    )
  }

  getProduct(quoteId: number) {
    this.readyToShipManageService.getQuoteProduct(quoteId).subscribe(
      data => {
        this.quoteProduct = data;
      }
    )
  }

  sendToFrieghtPartner() {    
    if (this.shippingData.boxType === 'Container') {
      this.shippingData.boxTypeData = this.shippingDataContainer;
    } 
    if (this.shippingData.boxType === 'Boxes') {
      this.shippingData.boxTypeData = this.boxesData;
    }

    this.readyToShipManageService.saveQuoteFreightForward(this.shippingData).subscribe(
      data => {
        if(data.data.insertId) {
          this.snotifyService.success('Submited to the logistic partner');
        }      
      },
      (err) => {
        this.snotifyService.error('Something went wrong');
        console.log(err);        
      }
    )
  }
}
