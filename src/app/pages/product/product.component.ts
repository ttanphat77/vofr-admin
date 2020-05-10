import { Component, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DatePipe } from '@angular/common';
import { sortDate } from '../common/sortDate';
import { ActiveButtonRenderComponent } from './activeButton.render.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { ActionRenderComponent } from './action.render.component';
import { DescriptionRenderComponent } from './description.render.component';
import { NbDialogService } from '@nebular/theme';
import { Observable, observable } from 'rxjs';
import { SocketServiceService } from "../../services/socket-service.service";
import { FormatPriceComponent } from "./format-price/format-price.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})


export class ProductComponent {
  source: LocalDataSource = new LocalDataSource();
  newProduct: Product = new Product();
  products: Product[] = [];
  categories: Category[] = [];
  masterCategories: Category[] = [];
  errors: string;
  newProductSizes: any[] = [];
  adding: boolean = false;

  cateFilterList: any[] = [];
  masterFilterList: any[] = [];
  tableSettings: any = {
    actions: true,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '5%',
      },
      name: {
        title: 'Name',
        type: 'String',
        width: '25%',
      },
      price: {
        title: 'Price',
        type: 'custom',
        width: '5%',
        renderComponent: FormatPriceComponent
      },
      description: {
        title: 'Description',
        type: 'custom',
        width: '25%',
        renderComponent: DescriptionRenderComponent,
      },
      masterCategoryId: {
        title: 'Master category',
        width: '5%',
        type: 'String',
        sort: false,
        valuePrepareFunction: (masterCategoryId) => {
          var category: Category = this.categories.find(cate => cate.id == masterCategoryId)
          if (category) {
            return category.name;
          } else {
            return '';
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.masterFilterList,
          },
        },
      },
      categoryId: {
        title: 'Category',
        width: '5%',
        type: 'String',
        sort: false,
        valuePrepareFunction: (categoryId) => {
          var category: Category = this.categories.find(cate => cate.id == categoryId)
          if (category) {
            return category.name;
          } else {
            return '';
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.cateFilterList,
          },
        },
      },
      createdDate: {
        title: 'Created date',
        filter: false,
        sort: true,
        sortDirection: 'desc',
        width: '10%',
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'd/M/yyyy, h:mm a');
        }
      },
      modifiedDate: {
        title: 'Last modified',
        filter: false,
        compareFunction: sortDate,
        width: '10%',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'd/M/yyyy, h:mm a');
        }
      },
      button: {
        title: '',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ActiveButtonRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.handleChangeStatus(row);
          });
        },
        filter: false,
        sort: false,
      },
      action: {
        title: '',
        type: 'custom',
        filter: false,
        width: '5%',
        valuePrepareFunction: (cell, row) => {
          return {
            row: row,
            cateList: this.categories,
          }
        },
        renderComponent: ActionRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((res) => {
            if (res.action === 'edit') {
              this.handleEdit(res.product);
            } else if (res.action === 'delete') {
              this.handleDelete(res.product);
            }
          });
        },
      },
    },
  };

  constructor(
    private productService: ProductService,
    private dialogService: NbDialogService,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    private socketService: SocketServiceService
  ) {
  }

  ngOnInit(): void {
    this.getAllData().subscribe(res => {
      this.tableSettings = Object.assign(
        {},
        this.tableSettings,
      );
      this.source.load(this.products);
    });
  }

  getAllData() {
    return Observable.create(observable => {
      this.categoryService.getAllCategory().subscribe(data => {
        var listCategory: any[] = data.data;
        listCategory.forEach(element => {
          var category: Category = new Category();
          category.id = element.category_id;
          category.name = element.category_name;
          category.createdDate = element.date_created;
          category.modifiedDate = element.date_modified;
          category.isActived = element.actived;
          category.masterCategoryId = element.master_category_id;
          this.categories.push(category);
          if (category.masterCategoryId == null) {
            this.masterCategories.push(category);
            this.masterFilterList.push({ value: element.category_id, title: element.category_name });
          } else {
            this.cateFilterList.push({ value: element.category_id, title: element.category_name });
          }
        });
        this.masterFilterList.push({ value: null, title: 'No category' })
        this.cateFilterList.push({ value: null, title: 'No category' })
        this.productService.getAllProduct().subscribe(data => {
          var listProduct: any[] = (data as any).data;
          listProduct.forEach(element => {
            var product: Product = new Product();
            product.id = element.product_id;
            product.name = element.product_name;
            product.price = element.product_price;
            product.description = element.description;
            product.createdDate = element.date_created;
            product.modifiedDate = element.dated_modified;
            product.isActived = element.actived;
            product.categoryId = element.category_id;
            product.masterCategoryId = element.master_category_id;
            this.products.push(product);
          });
          observable.next(true);
          return observable.complete();
        })
      })
    })
  }

  tableSetting() {
    return this.tableSettings;
  }

  // getAllProducts() {
  //     this.productService.getAllProduct().subscribe(data => {
  //         var listProduct: any[] = (data as any).data;
  //         listProduct.forEach(element => {
  //             var product: Product = new Product();
  //             product.id = element.product_id;
  //             product.name = element.product_name;
  //             product.price = element.product_price;
  //             product.description = element.description;
  //             product.createdDate = element.date_created;
  //             product.modifiedDate = element.dated_modified;
  //             product.isActived = element.actived;
  //             product.categoryId = element.category_id;
  //             product.masterCategoryId = element.master_category_id;
  //             this.products.push(product);
  //         });
  //         this.source.load(this.products);
  //     })
  // }

  // getListCategory() {
  //     this.categoryService.getAllCategory().subscribe(data => {
  //         var listCategory: any[] = data.data;
  //         listCategory.forEach(element => {
  //             var category: Category = new Category();
  //             category.id = element.category_id;
  //             category.name = element.category_name;
  //             category.createdDate = element.date_created;
  //             category.modifiedDate = element.date_modified;
  //             category.isActived = element.actived;
  //             category.masterCategoryId = element.master_category_id;
  //             this.categories.push(category);
  //             if (category.masterCategoryId == null) {
  //                 this.masterCategories.push(category);
  //                 this.masterFilterList.push({ value: element.category_id, title: element.category_name });
  //             } else {
  //                 this.cateFilterList.push({ value: element.category_id, title: element.category_name });
  //             }
  //         })
  //     })
  // }

  filtCategory(id) {
    return this.categories.filter((cate) => {
      return cate.masterCategoryId == id
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false });
  }

  handleChangeStatus(product: Product) {
    const pro = product;
    pro.isActived = !pro.isActived;
    this.source.update(product, pro);
  }

  handleEdit(newProduct: Product) {
    const oldProduct = this.products.find(pro => pro.id == newProduct.id);
    this.source.update(oldProduct, newProduct)
  }

  handleDelete(product: Product) {
    this.source.remove(product);
  }

  onSubmit(ref: any) {
    this.adding = true
    this.productService.createProduct(this.newProduct).subscribe(res => {
      var product = new Product();
      product.id = res.data.product_id;
      product.name = res.data.product_name;
      product.price = res.data.product_price;
      product.description = res.data.description;
      product.createdDate = res.data.date_created;
      product.modifiedDate = res.data.dated_modified;
      product.isActived = res.data.actived;
      product.categoryId = res.data.category_id;
      var cate: Category = this.categories.find(cate => cate.id == product.categoryId)
      product.masterCategoryId = cate.masterCategoryId;
      this.source.add(product);
      this.source.refresh();
      ref.close();
      this.createSize(res.data.product_id);
      this.adding = false;
    }, (err) => {
      console.log(err);
      this.adding = false;
    })
  }

  addSize() {
    this.newProductSizes.push({
      name: ''
    })
  }

  removeSize(index) {
    this.newProductSizes.splice(index, 1);
  }

  createSize(productId) {
    this.newProductSizes.forEach((size) => {
      this.productService.createProductSize(productId, size.name).subscribe((rs) => { }, (err) => console.log(err))
    })
  }
}
