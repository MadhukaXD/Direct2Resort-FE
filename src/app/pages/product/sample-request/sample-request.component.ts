import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/auth/login.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sample-request',
  templateUrl: './sample-request.component.html',
  styleUrls: ['./sample-request.component.scss']
})
export class SampleRequestComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private loginService: LoginService, private route: ActivatedRoute, private productService: ProductService, 
    private modalService: BsModalService, private snotifyService: SnotifyService, private router: Router) { }

  sampleReqObj: any;
  isLoadingSampleReq: boolean = false;
  productData: any;

  ngOnInit() {    
    this.sampleReqObj = {
      productId: 0,
      note: ''
    }
  }

  requestSample(product: any) {
    this.isLoadingSampleReq = true;
    this.sampleReqObj.productId = this.productData.productInfo.product_id;
    this.productService.requestSample(this.sampleReqObj).subscribe(
      data => {
        this.isLoadingSampleReq = false;
        if(data.status){
          this.snotifyService.success(data.message);
          this.bsModalRef.hide();
          this.sampleReqObj.productId = 0;
          this.sampleReqObj.note = '';
        } else {
          this.snotifyService.error(data.message);
        }        
      },
      (error) => {
        this.isLoadingSampleReq = false;
        this.snotifyService.error('Something went wrong');
      }
    );
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    return {
      backgroundImage: `url(${firstImg[0]})`
    };
  }
}
