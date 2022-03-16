import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IvysRfqModalService } from './ivys-rfq-modal.service';

@Component({
  selector: 'app-ivys-rfq-modal',
  templateUrl: './ivys-rfq-modal.component.html',
  styleUrls: ['./ivys-rfq-modal.component.scss']
})
export class IvysRfqModalComponent implements OnInit {
  product: any;
  quoteItem: any;
  constructor(public bsModalRef: BsModalRef, private ivysRfqModalService: IvysRfqModalService) { }

  ngOnInit() {
    this.quoteItem = {
      freightMethod: '',
      quantity: '',
      buyer_msg: '',
      selected_product_variants_id_list: [],
      Product_product_id: this.product.productInfo.product_id,
      Product_Company_company_id:this.product.productInfo.Company_company_id
    }
    console.log(this.product);
    
  }

  sendRfq() {
    console.log(this.quoteItem);
    this.ivysRfqModalService.sendRfq(this.quoteItem).subscribe(
      data => {
        console.log(data);        
      }
    )
  }
}
