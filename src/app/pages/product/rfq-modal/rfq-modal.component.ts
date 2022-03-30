import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RfqModalService } from './rfq-modal.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-rfq-modal',
  templateUrl: './rfq-modal.component.html',
  styleUrls: ['./rfq-modal.component.scss']
})
export class RfqModalComponent implements OnInit {
  isLoadingForm: boolean = false;
  quoteItem: any;
  rfqQty: string;
  productData: any;
  quoteStatus: {
    status: boolean,
    msg: string;
  }
  relatedProducts: any;
  productVariants: any;

  constructor(public bsModalRef: BsModalRef, private rfqModalService: RfqModalService, private snotifyService: SnotifyService) { }

  ngOnInit() {
    this.rfqQty = '';
    this.quoteStatus = {
      status: false,
      msg: ''
    }
    this.quoteItem = {
      freightMethod: '',
      Product_Company_company_id: this.productData.productInfo.Company_company_id,
      product_created_by: this.productData.productInfo.product_created_by,
      productsList: []
    }

    this.productVariants = JSON.parse(this.productData.productInfo.product_variants);    
  }

  sendRfq(f) {
    
    this.quoteItem.productsList.push({product_id: this.productData.productInfo.product_id, qty: parseInt(this.rfqQty)});
    
    if(f.valid) {
      if(f.value.quantity.match(/^-{0,1}\d+$/)) {
        this.isLoadingForm = true;
         this.rfqModalService.sendRfq(this.quoteItem).subscribe(
          data => {
            this.isLoadingForm = false;
            if(data.status) {              
              this.quoteItem = {
                freightMethod: '',
                quantity: '',
                buyer_msg: '',
                selected_product_variants_id_list: '',
                Product_product_id: 0,
                Product_Company_company_id: 0,
                product_created_by: 0
              }
              this.quoteStatus = {
                msg: 'we weill get back to you soon.',
                status: true
              }
              this.getRelatedProductList();
              //this.snotifyService.success('Quote request Successfull');
            }
          },
          (err) => {
            this.quoteStatus.status = false;
            this.isLoadingForm = false;
            this.snotifyService.error(err.message);
          }
        )
      } else {
        this.snotifyService.error('Please enter valid quantity');
      }     
    }
  }

  getRelatedProductList() {
    const reqData = {
      product_id: this.productData.productInfo.product_id,
      sub_prod_cat: this.productData.productInfo.SubProductCategories_sub_prod_cat_id
    }
    this.isLoadingForm = true;
    this.rfqModalService.getRelatedProducts(reqData).subscribe(
      data => {
        this.relatedProducts = data;  
        this.isLoadingForm = false;
      },
      (error) => {
        console.log(error); 
        this.isLoadingForm = false;       
      }
    );
  }
}
