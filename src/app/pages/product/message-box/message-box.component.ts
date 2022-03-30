import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SnotifyService } from 'ng-snotify';
import { MessageBoxService } from './message-box.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  isLoading: boolean = false;
  buyerData: any;
  productData: any;

  msg: {
    msgContent: string,
    buyerId: number,
    sellerId: number,
    productId: number
  }

  constructor(public bsModalRef: BsModalRef, private snotifyService: SnotifyService, private messageBoxService: MessageBoxService) { }

  ngOnInit() {
    this.msg = {
      buyerId: this.buyerData.companyId,
      sellerId: this.productData.productInfo.Company_company_id,
      msgContent: '', 
      productId: this.productData.productInfo.product_id
    }    
  }

  sendMsg() {    
    this.isLoading = true;
    this.messageBoxService.sendMsg(this.msg).subscribe(
      data => {
        if (data.uuid) {
          this.isLoading = false;
          this.msg.msgContent = '';
          this.bsModalRef.hide();
          this.snotifyService.success('Message sent');
        }
      },
      (error) => {
        this.isLoading = false;
        this.snotifyService.error('Something went wrong');
      }
    )
  }

}
