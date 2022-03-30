import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SnotifyService } from 'ng-snotify';
import { SeriesRfqModalService } from './series-rfq-modal.service';

@Component({
  selector: 'app-series-rfq-modal',
  templateUrl: './series-rfq-modal.component.html',
  styleUrls: ['./series-rfq-modal.component.scss']
})
export class SeriesRfqModalComponent implements OnInit {
  isLoadingForm: boolean = false;
  quoteItem: any;
  productData: any;
  companyId: number;
  quoteStatus: {
    status: boolean,
    msg: string;
  }
  relatedProducts: any;
  constructor(public bsModalRef: BsModalRef, private snotifyService: SnotifyService, private seriesRfqModalService: SeriesRfqModalService) { }

  ngOnInit() {
    this.quoteStatus = {
      status: false,
      msg: ''
    }
    this.quoteItem = {
      freightMethod: '',
      buyer_msg: '',
      Product_Company_company_id: this.companyId,
      product_created_by: this.productData[0].product.product_created_by,
      productsList: []
    }
  }

  sendRfq(f) {
    this.productData.forEach(product => {
      this.quoteItem.productsList.push({product_id: product.product.product_id, qty: product.qty});
    });    
    if(f.valid) {
      this.isLoadingForm = true;
        this.seriesRfqModalService.createQuote(this.quoteItem).subscribe(
        data => {
          this.isLoadingForm = false;
          if(data.status) {              
            this.quoteItem = {
              freightMethod: '',
              buyer_msg: '',
              Product_Company_company_id: this.companyId,
              productsList: []
            }
            
            this.quoteStatus = {
              msg: 'we weill get back to you soon.',
              status: true
            }
            this.seriesRfqModalService.rfqStatus({status: true});
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
    }
  }

  getRelatedProductList() {
    const reqData = {
      product_id: this.productData[0].product.product_id,
      sub_prod_cat: this.productData[0].product.SubProductCategories_sub_prod_cat_id
    }
    this.isLoadingForm = true;
    this.seriesRfqModalService.getRelatedProducts(reqData).subscribe(
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
