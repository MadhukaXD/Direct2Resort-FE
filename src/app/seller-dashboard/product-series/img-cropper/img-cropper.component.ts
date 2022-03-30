import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})
export class ImgCropperComponent implements OnInit {
  croppedImage: any;
  imageData: any;
  series: any;
  imageChangedEvent: any = '';
  reOpenModal: any;
  reOpenModalRef: BsModalRef;

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit() {
    console.log(this.imageData);
    this.imageChangedEvent = this.imageData;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.bsModalRef.hide();
    //this.snotifyService.error('Image Load Failed')
  }

  addCroppedImg() {
    this.bsModalRef.hide();

    // this.seriesBannerImg = this.croppedImage;
    // this.productSeries.product_series_banner = this.croppedImage;
    
    // this.imgCropperModalRef.hide();
     this.reOpenModalRef = this.modalService.show(this.reOpenModal, {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        croppedImg: this.croppedImage,
        series: this.series
      }
    });
    // this.croppedImage = '';   
  }
}
