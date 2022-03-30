import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerShippingManagerService } from './seller-shipping-manager.service';
import { SnotifyService } from 'ng-snotify';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-shipping-manager',
  templateUrl: './seller-shipping-manager.component.html',
  styleUrls: ['./seller-shipping-manager.component.scss']
})
export class SellerShippingManagerComponent implements OnInit {
  isLoading: boolean = false;
  quoteSub: Subscription;
  lastQuoteInstance: any;
  mainQuote: any;

  shippingData: {
    quote_uuid: string,
    frieght_type: string,
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

  pallertType: any;

  palletData: {
    palletName: string,
    height: string,
    width: string,
    length: string,
    totalVolume: string,
    volumeMessure: string,
    weight: string,
    weightMessure: string
  }

  shippingBoxType: any;
  freightData: any;

  constructor(private route: ActivatedRoute, 
    private sellerShippingManagerService: SellerShippingManagerService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.shippingBoxType = [{type: 'Container'},{type: 'Boxes'},{type: 'Pallets'}];
    this.shippingData = {
      quote_uuid: '',
      frieght_type: '',
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

    this.palletData = {
      palletName: '',
      height: '',
      width: '',
      length: '',
      totalVolume: '',
      volumeMessure: '',
      weight: '',
      weightMessure: 'Kg'
    }

    this.loadAll();
  }

  loadAll() {
    this.quoteSub = this.route.params.subscribe(params => {
      this.getProductQuoteInstance(params.quote_uuid);
    });
  }


  getProductQuoteInstance(quote_uuid) {
    this.isLoading = true;
    this.sellerShippingManagerService.getProductQuoteInstancebyQuote(quote_uuid).subscribe(
      data => {
        this.lastQuoteInstance = data.data.quotations[data.data.quotations.length-1];         
        this.shippingData.quote_uuid = this.lastQuoteInstance.quote_uuid;
        this.mainQuote = data.data.quoteMain[0];
        if(data.data.quoteFreightData) {
          this.freightData = data.data.quoteFreightData[0];
        }        
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
  
  sendToFrieghtPartner() {
    this.shippingData.frieght_type = this.mainQuote.frieght_method;
    
    if (this.shippingData.boxType === 'Container') {
      this.shippingData.boxTypeData = this.shippingDataContainer;
    } 
    if (this.shippingData.boxType === 'Boxes') {
      this.shippingData.boxTypeData = this.boxesData;
    }
    if(this.shippingData.boxType === 'Pallets') {
      this.shippingData.boxTypeData = this.palletData; 
    };
    
    this.isLoading = true;

    this.sellerShippingManagerService.saveQuoteFreightForward(this.shippingData).subscribe(
      data => {
        this.isLoading = false;
        if(data) {
          this.snotifyService.success('Submited to the logistic partner');
        }
        this.loadAll();
      },
      (err) => {
        this.isLoading = false;
        if(err.error) {
          this.snotifyService.error(err.error.message);
        } else {
          this.snotifyService.error(err.statusText);
        }
        this.loadAll();
      }
    )
  }

  palletChange(palletType: string) {
    this.palletData.length = '0';
    this.palletData.width = '0'
    this.palletData.volumeMessure = '';
    this.palletData.totalVolume = '0';

    if(palletType === '48') {
      this.palletData.palletName = '40x48';
      this.palletData.length = '48';
      this.palletData.width = '40'
      this.palletData.volumeMessure = 'CFT';
    } else if(palletType === 'euro1') {
      this.palletData.palletName = 'Euro 1';
      this.palletData.length = '120';
      this.palletData.width = '80'
      this.palletData.volumeMessure = 'CBM';
    } else if(palletType === 'euro2') {
      this.palletData.palletName = 'Euro 2';
      this.palletData.length = '100';
      this.palletData.width = '120'
      this.palletData.volumeMessure = 'CBM';
    } else if(palletType === 'custom') {
      this.palletData.palletName = 'Custom';
      this.palletData.volumeMessure = 'CBM';
    }
  }

  palletHeightChange(heightValue, pallertType) {
    let dividerVal = 0;
    if(pallertType === '48') {
      dividerVal = 1728;
    } else if(pallertType === 'euro1' || pallertType === 'euro2') {
      dividerVal = 1000000;
    }

    this.palletData.height = heightValue;
    
    const totalVolume = ((parseInt(this.palletData.height) * parseInt(this.palletData.length) * parseInt(this.palletData.width)) / dividerVal);

    this.palletData.totalVolume = totalVolume.toFixed(2);
  }

  palletCustom(dimentionValue, dimentionType) {
    let dividerVal = 0;
    debugger
    if(this.palletData.volumeMessure === 'CBM') {
      dividerVal = 1000000;
    } else if(this.palletData.volumeMessure === 'CFT') {
      dividerVal = 1728;
    }

    if(dimentionType === 'height') {
      this.palletData.height = dimentionValue;
    } else if(dimentionType === 'length') {
      this.palletData.length = dimentionValue;
    } else if(dimentionType === 'width') {
      this.palletData.width = dimentionValue;
    }

    const totalVolume = ((parseInt(this.palletData.height) * parseInt(this.palletData.length) * parseInt(this.palletData.width)) / dividerVal);

    this.palletData.totalVolume = totalVolume.toFixed(2);
  }

  customMetricChange(value: string) {
    let dividerVal = 0;
    if(value === 'CBM') {
      this.palletData.volumeMessure = 'CBM';
      dividerVal = 1000000;
    } else if(value === 'CFT') {
      this.palletData.volumeMessure = 'CFT';
      dividerVal = 1728;
    }

    if(this.palletData.height && this.palletData.length && this.palletData.width) {
      const totalVolume = ((parseInt(this.palletData.height) * parseInt(this.palletData.length) * parseInt(this.palletData.width)) / dividerVal);
      this.palletData.totalVolume = totalVolume.toFixed(2);
    }
  }
}
