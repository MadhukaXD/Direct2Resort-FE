import { Component, OnInit } from '@angular/core';
import { BidManagerService } from './bid-manager.service';
import { ActivatedRoute } from '@angular/router';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import { DatePipe } from '@angular/common';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-bid-manager',
  templateUrl: './bid-manager.component.html',
  styleUrls: ['./bid-manager.component.scss']
})
export class BidManagerComponent implements OnInit {
  isLoading: boolean = false;
  today = new Date();
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy',
  };

  myDatePickerSea: IMyDateModel = null;
  myDatePickerAir: IMyDateModel = null;

  bidHistory: {
    seaEta: Date,
    airEta: Date,
    special_remarks: string,
    sea_frieght_data_json: any,
    air_frieght_data_json: any,
    bid_total_price: number,
    submitedDate: string,
    bidStatus: string
  };

  frieghtDataSub: any;
  sellerFreightData: any;
  bidData: {    
    quote_uuid: string,
    seaEta: Date,
    airEta: Date,
    special_remarks: string,
    sea_frieght_data_json: any,
    air_frieght_data_json: any,
    airFreightTotal: number,
    seaFreightTotal: number
  }

  airFreightBidRatesTbl: {
    pickupDelivery: {
      rate: string,
      cost: number
    },
    handlingFees: {
      rate: string,
      cost: number
    },
    exportDocuments: {
      rate: string,
      cost: number
    },
    containerLoading: {
      rate: string,
      cost: number
    },
    terminalFees: {
      rate: string,
      cost: number
    },
    freight: {
      rate: string,
      cost: number
    },
    importDocuments: {
      rate: string,
      cost: number
    },
    inlandToTerminal: {
      rate: string,
      cost: number
    },
    containerUnloading: {
      rate: string,
      cost: number
    },
    importHandling: {
      rate: string,
      cost: number
    },
    doorDeliveryg: {
      rate: string,
      cost: number
    },
    customsClearance: {
      rate: string,
      cost: number
    },
    duty: {
      rate: string,
      cost: number
    },
    taxes: {
      rate: string,
      cost: number
    },
    other: {
      rate: string,
      cost: number
    },
    total: number
  }

  seaFreightBidRatesTbl: {
    pickupDelivery: {
      rate: string,
      cost: number
    },
    handlingFees: {
      rate: string,
      cost: number
    },
    exportDocuments: {
      rate: string,
      cost: number
    },
    containerLoading: {
      rate: string,
      cost: number
    },
    terminalFees: {
      rate: string,
      cost: number
    },
    freight: {
      rate: string,
      cost: number
    },
    importDocuments: {
      rate: string,
      cost: number
    },
    inlandToTerminal: {
      rate: string,
      cost: number
    },
    containerUnloading: {
      rate: string,
      cost: number
    },
    importHandling: {
      rate: string,
      cost: number
    },
    doorDeliveryg: {
      rate: string,
      cost: number
    },
    customsClearance: {
      rate: string,
      cost: number
    },
    duty: {
      rate: string,
      cost: number
    },
    taxes: {
      rate: string,
      cost: number
    },
    other: {
      rate: string,
      cost: number
    },
    total: number
  }

  constructor(private datePipe: DatePipe, private bidManagerService: BidManagerService, private route: ActivatedRoute, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.bidHistory = {
      seaEta: null,
      airEta: null,
      air_frieght_data_json: {},
      sea_frieght_data_json: {},
      special_remarks: '',
      bid_total_price: 0,
      submitedDate: '',
      bidStatus: ''
    }

    this.bidData = {
      quote_uuid: '',
      seaEta: null,
      airEta: null,
      air_frieght_data_json: {},
      sea_frieght_data_json: {},
      special_remarks: '',
      airFreightTotal: 0,
      seaFreightTotal: 0
    }

    this.airFreightBidRatesTbl = {
      pickupDelivery: {
        rate: '',
        cost: 0
      },
      handlingFees: {
        rate: '',
        cost: 0
      },
      exportDocuments: {
        rate: '',
        cost: 0
      },
      containerLoading: {
        rate: '',
        cost: 0
      },
      terminalFees: {
        rate: '',
        cost: 0
      },
      freight: {
        rate: '',
        cost: 0
      },
      importDocuments: {
        rate: '',
        cost: 0
      },
      inlandToTerminal: {
        rate: '',
        cost: 0
      },
      containerUnloading: {
        rate: '',
        cost: 0
      },
      importHandling: {
        rate: '',
        cost: 0
      },
      doorDeliveryg: {
        rate: '',
        cost: 0
      },
      customsClearance: {
        rate: '',
        cost: 0
      },
      duty: {
        rate: '',
        cost: 0
      },
      taxes: {
        rate: '',
        cost: 0
      },
      other: {
        rate: '',
        cost: 0
      },
      total: 0
    }
    
    this.seaFreightBidRatesTbl = {
      pickupDelivery: {
        rate: '',
        cost: 0
      },
      handlingFees: {
        rate: '',
        cost: 0
      },
      exportDocuments: {
        rate: '',
        cost: 0
      },
      containerLoading: {
        rate: '',
        cost: 0
      },
      terminalFees: {
        rate: '',
        cost: 0
      },
      freight: {
        rate: '',
        cost: 0
      },
      importDocuments: {
        rate: '',
        cost: 0
      },
      inlandToTerminal: {
        rate: '',
        cost: 0
      },
      containerUnloading: {
        rate: '',
        cost: 0
      },
      importHandling: {
        rate: '',
        cost: 0
      },
      doorDeliveryg: {
        rate: '',
        cost: 0
      },
      customsClearance: {
        rate: '',
        cost: 0
      },
      duty: {
        rate: '',
        cost: 0
      },
      taxes: {
        rate: '',
        cost: 0
      },
      other: {
        rate: '',
        cost: 0
      },
      total: 0
    }

    this.loadAll();
  }

  loadAll() {
    this.frieghtDataSub = this.route.params.subscribe(params => {
      this.getSellerFreightData(params.freightDataId);
    });
  }

  getSellerFreightData(freightDataId: string) {
    this.isLoading = true;
    this.bidManagerService.getQuoteFrightForLPListSingle(freightDataId).subscribe(
      data => {
        this.sellerFreightData = data;
        this.bidData.quote_uuid = data.quote_uuid;
        this.getBidHistory(this.bidData.quote_uuid);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong')
      }
    )
  }

  postBid(){
    this.isLoading = true;
    this.bidData.air_frieght_data_json = this.airFreightBidRatesTbl;
    this.bidData.sea_frieght_data_json = this.seaFreightBidRatesTbl;

    this.bidData.airFreightTotal = this.airFreightBidRatesTbl.total;
    this.bidData.seaFreightTotal = this.seaFreightBidRatesTbl.total;

    this.bidManagerService.saveLogisticPartnerBid(this.bidData).subscribe(
      data => {
        if(data.data.insertId) {
          this.isLoading = false;
          this.snotifyService.success('Succesfully placed the Bid');
        }
        this.loadAll();
      },
      (err) => {   
        this.isLoading = false;     
        this.snotifyService.error('Something went wrong');
        this.loadAll();
      }
    )
  }

  calcTotalCost(){
    this.airFreightBidRatesTbl.total = 0;
    for(const key in this.airFreightBidRatesTbl) {
      if(key !== 'total') {
        if(this.airFreightBidRatesTbl.hasOwnProperty(key)) {
          
          this.airFreightBidRatesTbl.total = (parseFloat(this.airFreightBidRatesTbl.total.toString()) + parseFloat(this.airFreightBidRatesTbl[key].cost));
          
        }
      }
    }
  }

  calcTotalCostSea() {
    this.seaFreightBidRatesTbl.total = 0;
    for(const key in this.seaFreightBidRatesTbl) {
      if(key !== 'total') {
        if(this.seaFreightBidRatesTbl.hasOwnProperty(key)) {
          
          this.seaFreightBidRatesTbl.total = (parseFloat(this.seaFreightBidRatesTbl.total.toString()) + parseFloat(this.seaFreightBidRatesTbl[key].cost));
          
        }
      }
    }
  }

  onDateChanged(event: IMyDateModel, etaType): void {
    if(etaType === 'sea') {
      this.bidData.seaEta = event.singleDate.jsDate;
    } else {
      this.bidData.airEta = event.singleDate.jsDate;
    }    
  }
  

  getBidHistory(quoteId) {
    this.bidManagerService.getBidsPerQuote(quoteId).subscribe(
      data => {
        if(data) {
          this.bidHistory = {
            air_frieght_data_json: JSON.parse(data.air_frieght_data_json),
            bid_total_price: data.bid_total_price,
            seaEta: data.seaEta,
            airEta: data.airEta,
            submitedDate: data.bid_submited_date,
            sea_frieght_data_json: JSON.parse(data.sea_frieght_data_json),
            special_remarks: data.special_remarks,
            bidStatus: data.bid_status            
          }    
        }     
      }
    )
  }
}
