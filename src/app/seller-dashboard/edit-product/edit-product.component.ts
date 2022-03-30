import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SnotifyService } from 'ng-snotify';
import { EditProductService } from './edit-product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: any;
  files: File[] = [];
  availableImgs: any;
  imgPath: any;
  productVariations: any;
  productCategories: any;
  productSubCats: any;
  productSpecifications: any[] = [];
  productImgs: any;
  public Editor = ClassicEditor;
  countryList: any;
  unitList: any;

  publicImgPath: string;

  isLoading: boolean = false;
  isLoadingCategories: boolean = false;
  isLoadingSubCats: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImgList: any = [];
  imgSelector: any;
  imgGallaryOrLog: string;
  brandLogoSelector: any;
  brandLogo: any = null;
  finalImgList: any;

  isDutyIdEmpty: boolean = false;

  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','image'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  public editorContent: string = 'My Document\'s Title'
  customTabName: string;
  customTabs: any[] = [];
  productSub: any;

  dutyRates: any;
  testM: any;
  modalRef: BsModalRef;
  @ViewChild('imageCropper') imgCropperModal: ElementRef;
  
  keyword = 'name';
  selectedDuty: any;

  productBeforeEdit: any;

  constructor(private editProductService: EditProductService, private snotifyService: SnotifyService, private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit() {
    this.publicImgPath = environment.uploadedImgPath;
    this.productImgs = [];
    this.productVariations = [];
    this.finalImgList = [];

    this.product = {
      product_id: '',
      product_name: '',
      product_price: '',
      min_order_qty: 0,
      product_desc: '',
      product_unit: '',
      product_country: '',
      shipping_method: '',
      SubProductCategories_sub_prod_cat_id: '',
      SubProductCategories_ProductCategories_product_cat_id: '',      
      product_spec_desc: '',
      product_qty: '',
      itemCode: '',      
      offer_samples: false,
      sustainable_product: false,
      product_sample_price: 0
    };
    
    this.getCountries();
    this.getUnits();
    this.loadAll();
  }

  loadAll() {
    this.productSub = this.route.params.subscribe(params => {
      this.getProductData(params.productId);
    });
  }

  getProductData(productId) {    
    this.isLoading = true;
    this.editProductService.getSingleProduct(productId).subscribe(
      data => {        
        this.productBeforeEdit = {
          SubProductCategories_ProductCategories_product_cat_id: data.productInfo.SubProductCategories_ProductCategories_product_cat_id,
          SubProductCategories_sub_prod_cat_id: data.productInfo.SubProductCategories_sub_prod_cat_id,
          brandLogo: [data.productInfo.product_logo],
          customTabs: data.customTabs,
          duty: data.productInfo.duty,
          itemCode: data.productInfo.product_item_code,
          min_order_qty: data.productInfo.min_order_qty,
          offer_samples: data.productInfo.offer_samples,
          product_country: data.productInfo.country,
          product_desc: data.productInfo.product_desc,
          product_id:  data.productInfo.product_id,
          product_name: data.productInfo.product_name,
          product_price: data.productInfo.product_price,
          product_qty: data.productInfo.product_qty,
          product_sample_price: data.productInfo.product_sample_price,
          product_spec_desc: data.productInfo.product_spec_desc,
          product_specifications: [],
          product_unit: data.productInfo.product_unit,
          product_variants: [],
          shipping_method: '',
          sustainable_product: data.productInfo.sustainable_product,
          product_url: data.productInfo.product_url
        }

        this.product = {
          product_id: data.productInfo.product_id,
          product_name: data.productInfo.product_name,
          product_price: data.productInfo.product_price,
          min_order_qty: data.productInfo.min_order_qty,
          product_desc: data.productInfo.product_desc,
          product_unit: data.productInfo.product_unit,
          product_country: data.productInfo.country,
          shipping_method: '',
          SubProductCategories_sub_prod_cat_id: data.productInfo.SubProductCategories_sub_prod_cat_id,
          SubProductCategories_ProductCategories_product_cat_id: data.productInfo.SubProductCategories_ProductCategories_product_cat_id,      
          product_spec_desc: data.productInfo.product_spec_desc,
          product_qty: data.productInfo.product_qty,
          itemCode: data.productInfo.product_item_code,
          offer_samples: data.productInfo.offer_samples,
          product_sample_price: data.productInfo.product_sample_price,
          sustainable_product: data.productInfo.sustainable_product,
          duty: data.productInfo.duty,
          product_url: data.productInfo.product_url
        };
        
        this.getDutyRateData();

        this.productSpecifications = data.productAttrs;
        if(JSON.parse(data.productInfo.product_variants) !== null) {
          this.productVariations = JSON.parse(data.productInfo.product_variants);
        } else {
          this.productVariations = [];
        }
        

        
        if(data.productInfo.product_imgs) {
          this.availableImgs = data.productInfo.product_imgs.split(",");   
          this.productBeforeEdit.product_imgs = this.availableImgs;
          this.finalImgList.push(...this.availableImgs);          
        }      

        this.customTabs = data.customTabs;

        this.brandLogo = `${data.productInfo.product_logo}`;
        
        this.isLoading = false;        
      }, (error) => {        
        this.isLoading = false;
        console.log(error);        
      }
    )
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.editProductService.imgUpload(this.files).subscribe(
      data => {
        data.data.forEach(img => {
          this.productImgs.push(img);
        });
      }
    )
  }
  
  onRemove(event) {
    console.log(event);
    this.productImgs.splice(this.files.indexOf(event), 1);
  }

  getImg(file) {
    let imgData;
   /* let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      imgData = reader.result;
    }    */ 
  }

  getProductImg(imgs){
    const firstImg = imgs.split(',');    
    const img = `${firstImg[0]}`;
    return img;
  }

  addVariant() {
    const emptyVariant = {
      vKey: '',
      vValues: [
        {
          vValue: ''
        }
      ]
    }
    if(this.productVariations.length !== 3) {
      this.productVariations.push(emptyVariant);
    }
  }

  addProductVariantData(obj) {
    const emptyVariantData = {
      vValue: ''
    }
    obj.vValues.push(emptyVariantData);    
  }

  removeProductVariantData(variantDataList, index) {
    if(variantDataList.length > 1) {
      variantDataList.splice(index, 1);
    }    
  }

  removeVarition(variationList, index) {
    variationList.splice(index, 1);
  }

  addNewTab(): void {
    const newTabIndex = this.customTabs.length + 1;
    if(this.customTabs.length < 2) {
      this.customTabs.push({
        product_cus_tab_name: this.customTabName,
        product_cus_tab_desc: '',
        disabled: false,
        removable: true
      });

      this.customTabName = '';
    } else {
      this.snotifyService.warning('Only allowed 2 custom tabs');
    } 
  }

  removeTabHandler(tab: any): void {
    this.customTabs.splice(this.customTabs.indexOf(tab), 1);
    console.log('Remove Tab handler');
  }

  addProduct() {
    if(this.finalImgList.length > 0) {
      if(this.brandLogo !== null) { 
        this.isDutyIdEmpty = true;
          this.isLoading = true;
          this.product.product_imgs = this.finalImgList;
          this.product.product_variants = this.productVariations;
          this.product.customTabs = this.customTabs;
          this.product.product_specifications = this.productSpecifications;
          this.product.product_qty = 0;
          this.product.product_price = parseFloat(this.product.product_price);
          this.product.min_order_qty = parseInt(this.product.min_order_qty);    
          
          if(this.brandLogo.includes(`${environment.uploadedImgPath}/`)) {
            this.product.brandLogo =  [this.brandLogo.replace(`${environment.uploadedImgPath}/`, '')];
          } else {
            this.product.brandLogo = [this.brandLogo];
          }
          
          this.editProductService.addProduct({editedProduct: this.product, beforeEdit: this.productBeforeEdit}).subscribe(resProd => {
            this.isLoading = false;
            this.snotifyService.success('Product updated');
          }, () => {
            this.isLoading = false;
            this.snotifyService.error('Something went wrong');
          });        
      } else {
        this.snotifyService.warning('Please add brand logo');
      }
    } else {
      this.snotifyService.warning('Please add product images');
    }    
  }

  productVariantFormat(specObj): any{
    const formatedVariants = [];
    specObj.forEach(pSpecification => {
      formatedVariants.push({attr_key: pSpecification.cat_spec_attr_metas, attr_value: pSpecification.value});
    });
    return formatedVariants;
  }

  getCountries(){
    this.editProductService.getCountryList().subscribe((countries: any) => this.countryList = countries.data);
  }

  getUnits(){
    this.editProductService.getUnitsList().subscribe((units: any) => this.unitList = units.data);
  }

  /*--- IMG CROPPING ---*/
  fileChangeEvent(event: any, type: string): void {
    this.imgGallaryOrLog = type;
    this.imageChangedEvent = event;
    this.modalRef = this.modalService.show(this.imgCropperModal, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'img-cropper-modal'
    });
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  addCroppedImg() {
    if(this.imgGallaryOrLog === 'gallery') {
      if(this.finalImgList.length < 5) {
        this.finalImgList.push(this.croppedImage);
        this.croppedImgList.push(this.croppedImage);
      } else {
        this.snotifyService.warning('Only 5 product images allowed to upload');
      }      
    } else {
      console.log('Logo upload');
      this.brandLogo = this.croppedImage;
    }
    
    this.modalRef.hide();
    this.croppedImage = '';
    this.imgSelector = '';    
  }

  removeImg(index, list) {
    if(list === 'avlblImgs') {
      const finalListIndex = this.finalImgList.findIndex((element) => element === this.availableImgs[index]);
      this.finalImgList.splice(finalListIndex, 1)
      this.availableImgs.splice(index, 1);
    } else if(list === 'cropped') {
      const finalListIndex = this.finalImgList.findIndex((element) => element === this.croppedImgList[index]);
      this.finalImgList.splice(finalListIndex, 1);
      this.croppedImgList.splice(index, 1);
    }
    console.log(this.finalImgList);
    
    //this.croppedImgList.splice(index, 1);
  }

  removeBrandLogo() {
    this.brandLogo = null;
    this.brandLogoSelector = '';
  }

  getDutyRateData() {
    this.editProductService.getDutyRate().subscribe(
      data => {
        this.dutyRates = data; 
        this.selectedDuty = data.find(rate => rate.id === parseInt(this.product.duty));       
      }
    )
  }

  dutySelect(e: any) {
    this.product.duty = e.id;    
  }

  clearDuty(e: any) {
    this.product.duty = 0;    
  }

  getVal() {
    return {"id": this.selectedDuty.id, "name": this.selectedDuty.name};
  }
}
