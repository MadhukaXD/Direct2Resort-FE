import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BidHistoryService } from './bid-history.service';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {
  isLoading: boolean = false;
  bidHistory: any;
  modalRef: BsModalRef;

  selectedBHistory: {
    air_frieght_data_json: any,
    sea_frieght_data_json: any,
    approved_bid_type: string,
    bid_status: string,
    bid_total_price: number,
    airFreightTotal: number,
    seaFreightTotal: number,
    special_remarks: string,
    airEta: string,
    seaEta: string
  };

  constructor(private bidHistoryService: BidHistoryService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAvailableQuoteList();
  }

  
  getAvailableQuoteList() {
    this.isLoading = true;
    this.bidHistoryService.getBidHistory().subscribe(
      data => {
        this.bidHistory = data;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    )
  }

  openModal(template: TemplateRef<any>, bHistory: any) {
    this.modalRef = this.modalService.show(template);
    console.log(bHistory);
    this.selectedBHistory = {
      air_frieght_data_json: JSON.parse(bHistory.air_frieght_data_json),
      sea_frieght_data_json: JSON.parse(bHistory.sea_frieght_data_json),
      approved_bid_type: bHistory.approved_bid_type,
      bid_status: bHistory.bid_status,
      bid_total_price: bHistory.bid_total_price,
      airFreightTotal: bHistory.airFreightTotal,
      seaFreightTotal: bHistory.seaFreightTotal,
      special_remarks: bHistory.special_remarks,
      airEta: bHistory.airEta,
      seaEta: bHistory.seaEta
    };
  }
}
