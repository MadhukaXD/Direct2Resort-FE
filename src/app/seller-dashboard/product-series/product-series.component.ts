import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductSeriesService } from './product-series.service';
import { environment } from 'src/environments/environment';
import { SnotifyService } from 'ng-snotify';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { config } from 'process';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EditSeriesComponent } from './edit-series/edit-series.component';

@Component({
  selector: 'app-product-series',
  templateUrl: './product-series.component.html',
  styleUrls: ['./product-series.component.scss']
})
export class ProductSeriesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  isLoading: boolean = false;
  isLoadingForm: boolean = false;
  productCatList: any;
  productSubCatList: any;
  productList = [];
  selectedProducts = [];
  dropdownSettings = {};
  selectedProductFake = [];
  modalRef: BsModalRef;
  imgCropperModalRef: BsModalRef;
  editModalRef: BsModalRef;
  uploadedFile: any;
  isValidImg: boolean;
  seriesBanner: any;
  productSeries: {
    product_series_name: string,
    product_series_desc: string,
    product_category_id: string,
    product_series_banner: string,
    product_id: any
  }

  productSeriesList: any;
  isProductListEmpty: boolean = false;

  config = {
    animated: true,
    ignoreBackdropClick: true
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';
  seriesBannerImg: any;
  @ViewChild('imageCropper') imgCropperModal: ElementRef;
  @ViewChild('template') seriesModal: ElementRef;

  constructor(private modalService: BsModalService, private productSeriesService: ProductSeriesService, private snotifyService: SnotifyService) {}

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.productSeries = {
      product_series_name: '',
      product_series_desc: '',
      product_category_id: '',
      product_series_banner: '',
      product_id: []
    }
    
    this.getProductCats();
    this.dropdownSettings = {
      singleSelection: false,
      enableCheckAll: false,
      idField: 'product_id',
      textField: 'product_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.getAllProductSeries();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
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
  
  getProductCats() {
    this.productSeriesService.getProductCategories().subscribe(
      data => {
        this.productCatList = data;
      }
    )
  }

  getAllProducts(catId) {
    this.selectedProducts = [];
    this.productList = [];
    this.productSeriesService.getSellerProducts(catId).subscribe(
      data => {
        this.productList = data;
      }
    )
  }

  addProductSeries() {  
      if(this.productSeries.product_id.length > 0) {
        if(this.productSeries.product_series_banner !== "") {
          this.isLoadingForm = true;
          this.isProductListEmpty = false;
          this.productSeriesService.addProductSeries(this.productSeries).subscribe(
            data => {
              this.isLoadingForm = false;
              if(data.insertId) {
                this.selectedProducts = [];
                this.productList = [];
                this.productSeries = {
                  product_series_name: '',
                  product_series_desc: '',
                  product_category_id: '',
                  product_series_banner: '',
                  product_id: []
                }
                this.seriesBannerImg = '';
                this.modalRef.hide();
                this.getAllProductSeries();
                this.snotifyService.success('Product Series Created','');
              }
            },
            (err) => {    
              this.isLoadingForm = false;      
              this.snotifyService.error('Something went wrong','');
            }
          );
        } else {
          this.snotifyService.error('Please select a banner image');
        }           
      } else {
        this.isProductListEmpty = true;      
      }    
  }

  getAllProductSeries() {
    this.isLoading = true;
    this.productSeriesService.getProductSeriesList().subscribe(productSeries => {
      this.isLoading = false;
      this.productSeriesList = productSeries;
      this.rerender();
    })
  }

  deleteSeries(series: any) {    
    this.snotifyService.confirm('Are you sure you want to delete this product?', {
      closeOnClick: false,
      backdrop: 0.6,
      buttons: [
        {text: 'Yes', action: (toast) => {
          this.isLoading = true;
          this.productSeriesService.deleteProductSeries(series.product_series_ref_id).subscribe(
            data => {
              this.isLoading = false;
              if(data.status) {
                this.getAllProductSeries();             
                this.snotifyService.success('Product series delete');
              }              
            },
            (err) => {
              this.isLoading = false;
              this.snotifyService.error('Something went wrong');
            }
          )         
          this.snotifyService.remove(toast.id);
        }},
        {text: 'No', action: (toast) => {this.snotifyService.remove(toast.id);}}
      ]
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

   /*--- IMG CROPPING ---*/
   fileChangeEvent(event: any): void {
    const selectedFile = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if(!validImageTypes.includes(selectedFile.type)) {
      this.snotifyService.error('Please upload JPEG,JPG or PNG image');
    } else {
      this.modalRef.hide();
      this.imageChangedEvent = event;      
      this.imgCropperModalRef = this.modalService.show(this.imgCropperModal, {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'img-cropper-modal'
      });
    }    
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.imgCropperModalRef.hide();
    this.snotifyService.error('Image Load Failed')
  }

  addCroppedImg() {
    this.seriesBannerImg = this.croppedImage;
    this.productSeries.product_series_banner = this.croppedImage;
    
    this.imgCropperModalRef.hide();
    this.modalRef = this.modalService.show(this.seriesModal, this.config);
    this.croppedImage = '';   
  }

  openEditModal(series: any) {
    const config = {
      backdrop: true,
      ignoreBackdropClick: true,
      initialState: {
        series: series
      }
    }
    this.editModalRef = this.modalService.show(EditSeriesComponent, config);
  }
}
