import {Component, Input, OnInit, Output, EventEmitter, TemplateRef} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {ProductImageService} from '../../services/productImage.service';
import {ProductService} from '../../services/product.service';
import {FileUploader} from 'ng2-file-upload';
import {NbAuthService} from '@nebular/auth';
import {Image} from '../../models/image.model';
import {Category} from '../../models/category.model';
import {Product} from '../../models/product.model';
import {NbAccessChecker} from "@nebular/security";


const UPLOAD_URL = 'http://23.94.26.75/vat-api/api/upload-file';

@Component({
  templateUrl: './action.render.component.html',
})

export class ActionRenderComponent implements OnInit {
  dialogRef: any;
  masterCategory: Category[];
  images: Image[];
  previewObj: Image;
  arObj: Image;
  imgUploader: FileUploader;
  glbUploader: FileUploader;
  sfbUploader: FileUploader;
  token: string = '';
  imgLoading = false;
  glbLoading = false;
  sfbLoading = false;
  product: Product;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialogService: NbDialogService,
    private imageService: ProductImageService,
    private productService: ProductService,
    private tokenService: NbAuthService,
    public accessChecker: NbAccessChecker
  ) {
  }

  ngOnInit() {
    this.product = this.value.row;
    this.tokenService.getToken().subscribe(res => this.token = (res as any).token);
    this.masterCategory = this.value.cateList.filter((cate) => cate.masterCategoryId == null);
    // Image input config
    this.imgUploader = new FileUploader({
      url: UPLOAD_URL,
      method: 'POST',
      authTokenHeader: 'authorization',
      authToken: 'Bearer ' + this.token,
      itemAlias: 'files',
    });
    this.imgUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.imgUploader.onSuccessItem = (item, response) => {
      var name: string = response.substring(1, response.length - 1);
      this.addFile(name, 'img');
    };
    this.imgUploader.onCompleteAll = () => {
      this.imgUploader.clearQueue();
      this.imgLoading = false;
    };

    // glb file input config
    this.glbUploader = new FileUploader({
      url: UPLOAD_URL,
      method: 'POST',
      authTokenHeader: 'authorization',
      authToken: 'Bearer ' + this.token,
      itemAlias: 'files'
    });
    this.glbUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.glbUploader.onBeforeUploadItem = (file) => {
      this.glbLoading = true;
    };
    this.glbUploader.onSuccessItem = (item, response) => {
      var name: string = response.substring(1, response.length - 1);
      this.addFile(name, 'glb');
    };
    this.glbUploader.onCompleteAll = () => {
      this.glbUploader.clearQueue();
      this.glbLoading = false;
    };

    //sfb file input config
    this.sfbUploader = new FileUploader({
      url: UPLOAD_URL,
      method: 'POST',
      authTokenHeader: 'authorization',
      authToken: 'Bearer ' + this.token,
      itemAlias: 'files'
    });
    this.sfbUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.sfbUploader.onBeforeUploadItem = (file) => {
      this.sfbLoading = true;
    };
    this.sfbUploader.onSuccessItem = (item, response) => {
      var name: string = response.substring(1, response.length - 1);
      this.addFile(name, 'sfb')
    };
    this.sfbUploader.onCompleteAll = () => {
      this.sfbUploader.clearQueue();
      this.sfbLoading = false;
    };
  }

  getImages() {
    this.images = [];
    this.imageService.getImagesByProductId(this.value.row.id, 'img').subscribe(res => {
      var listImg = res.data;
      listImg.forEach(img => {
        var image: Image = new Image();
        image.id = img.image_id;
        image.url = img.image_url;
        var splited = image.url.split('_');
        image.name = splited.slice(1).join('_');
        this.images.push(image);
      })
    })
  }

  getPreviewObj() {
    this.imageService.getImagesByProductId(this.value.row.id, 'glb')
      .subscribe(res => {
        if (res.data.length > 0) {
          this.previewObj = new Image();
          this.previewObj.id = res.data[0].image_id;
          this.previewObj.url = res.data[0].image_url;
          var splited = this.previewObj.url.split('_');
          this.previewObj.name = splited.slice(1).join('_');
        }
      })
  }

  getArObj() {
    this.imageService.getImagesByProductId(this.value.row.id, 'sfb')
      .subscribe(res => {
        if (res.data.length > 0) {
          this.arObj = new Image();
          this.arObj.id = res.data[0].image_id;
          this.arObj.url = res.data[0].image_url;
          this.arObj.name = this.arObj.url.split('_')[1];
        }
      })
  }

  uploadImage() {
    this.imgUploader.uploadAll();
    this.imgLoading = true;
  }

  addFile(img, type) {
    this.imageService.addImage(this.value.row.id, 'http://23.94.26.75/vat-api/image/' + img, type)
      .subscribe(res => {
        if (type == 'img') {
          if (!this.imgLoading) {
            this.getImages();
          }
        } else if (type == 'glb') {
          if (this.previewObj) {
            this.deleteImage(this.previewObj, 'glb');
          } else {
            this.getPreviewObj();
          }
        } else if (type == 'sfb') {
          if (this.arObj) {
            this.deleteImage(this.arObj, 'sfb');
          } else {
            this.getArObj();
          }
        }
      })
  }

  deleteImage(image, type) {
    this.imageService.deleteImage(image.id)
      .subscribe(res => {
        if (type == 'img') {
          var index = this.images.indexOf(image);
          this.images.splice(index, 1);
        } else if (type == 'glb') {
          this.previewObj = null;
          this.getPreviewObj();
        } else if (type == 'sfb') {
          this.arObj = null;
          this.getArObj();
        }
      })
  }

  filtCategory(id) {
    return this.value.cateList.filter((cate) => {
      return cate.masterCategoryId == id
    });
  }

  saveProduct() {
    this.productService.updateProduct(this.value.row).subscribe();
    this.value.row = this.product;
    var newCategory = this.value.cateList.find(cate => cate.id == this.value.row.categoryId);
    this.value.row.modifiedDate = Date.now();
    this.value.row.masterCategoryId = newCategory.masterCategoryId;
    this.save.emit({product: this.value.row, action: 'edit'});
  }

  deleteProduct() {
    this.productService.deleteProduct(this.value.row.id).subscribe();
    this.save.emit({product: this.value.row, action: 'delete'})
  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      hasScroll: true,
      autoFocus: false,
      closeOnEsc: false
    });
  }

  openImg(dialog: TemplateRef<any>) {
    this.getImages();
    this.getPreviewObj();
    this.getArObj();
    this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
  }

  onSubmit(dialog: TemplateRef<any>) {
    this.saveProduct();
    return this.dialogRef.close();
  }
}
