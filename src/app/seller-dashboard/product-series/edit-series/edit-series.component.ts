import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditSeriesService } from './edit-series.service';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';
import { ImgCropperComponent } from '../img-cropper/img-cropper.component';

@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: ['./edit-series.component.scss']
})
export class EditSeriesComponent implements OnInit {
  isLoading: boolean = false;
  series: any;
  productSeries: {
    product_series_name: string,
    product_series_desc: string,
    product_category_id: string,
    product_series_banner: string,
    product_id: any
  }

  dropdownSettings: any;
  productCatList: any;
  productList: any;
  seriesProductList: any;
  selectedProducts = [];

  imgCropperModalRef: BsModalRef;
  croppedImg: any;
  seriesBanner: any;
  isProductListEmpty: boolean = false;
  constructor(public bsModalRef: BsModalRef, private editSeriesService: EditSeriesService, private snotifyService: SnotifyService, private modalService: BsModalService) { }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: 'product_id',
      textField: 'product_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.getProductCats();
    this.productSeries = this.series;
    this.productSeries.product_id = [];
    this.getAllProducts(this.series.product_category_id);
    this.getProductListBySeriesRef(this.series.product_series_ref_id);  
  }

  getProductCats() {
    this.editSeriesService.getProductCategories().subscribe(
      data => {
        this.productCatList = data;
      }
    )
  }

  getAllProducts(catId) {
    this.isLoading = true;
    this.editSeriesService.getSellerProducts(catId).subscribe(
      data => {
        this.isLoading = false;
        this.productList = data;
      }
    )
  }

  getProductListBySeriesRef(seriesRefId: number) {
    this.isLoading = true;
    this.editSeriesService.getProductListBySeriesRef(seriesRefId).subscribe(productList => {
      this.isLoading = false;
      this.seriesProductList = productList;
      this.seriesProductList.forEach(product => {
        this.productSeries.product_id.push(product.product_id);
      });
    })
  }

  getProductImg(imgs) {
    const productImg = imgs.split(',')[0];
    let styles = {
      'background-image': 'url('+productImg+')'
    };    
    return styles;    
  }

  removeProduct(product: any) {
    this.snotifyService.confirm('Are you sure you want to delete this product from Product Series?', {
      closeOnClick: false,
      backdrop: 0.6,
      buttons: [
        {text: 'Yes', action: (toast) => {
          
          this.isLoading = true;
          this.editSeriesService.removeProductFromSeries(product).subscribe(
            data => {
              if(data.status) {
                this.isLoading = false;
                this.getAllProducts(this.series.product_category_id);
                this.getProductListBySeriesRef(this.series.product_series_ref_id);
              }        
            },
            (error) => {
              this.snotifyService.error('Something went wrong');
            }
          )

          this.snotifyService.remove(toast.id);
        }},
        {text: 'No', action: (toast) => {this.snotifyService.remove(toast.id);}}
      ]
    });    
  }

  fileChangeEvent(event: any): void {
    const selectedFile = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if(!validImageTypes.includes(selectedFile.type)) {
      this.snotifyService.error('Please upload JPEG,JPG or PNG image');
    } else {
      this.bsModalRef.hide();
      this.imgCropperModalRef = this.modalService.show(ImgCropperComponent, {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'img-cropper-modal',
        initialState: {
          imageData: event,
          reOpenModal: EditSeriesComponent,
          series: this.series
        }
      });      
    }    
  }

  onItemSelect(item: any) {
    const itemFromList = this.selectedProducts.filter(obj => {
      return obj.product_id === item.product_id
    });
    //const productImg = itemFromList[0].product_imgs.split(",");
    //this.selectedProductFake.push({product_id: itemFromList[0].product_id, product_name: itemFromList[0].product_name, product_img: `${environment.uploadedImgPath}/${productImg[0]}`});
    this.productSeries.product_id.push(itemFromList[0].product_id);    
  }

  onItemDeSelect(item: any) {
    const removeIndex = this.productSeries.product_id.findIndex((element) => element === item.product_id);
    this.productSeries.product_id.splice(removeIndex, 1);
  }
  
  updateSeries() {
    this.isLoading = true;
    if(this.croppedImg !== undefined) {
      this.productSeries.product_series_banner = this.croppedImg; 
    }
    this.editSeriesService.updateProductSeries(this.productSeries).subscribe(
      data => {
        if(data.status) {
          this.isLoading = false;
          this.bsModalRef.hide();
          this.snotifyService.success(data.message);
        }
      },
      (err) => {
        this.isLoading = false;
        this.snotifyService.error(err.error.message)
      }
    )
  }
}
