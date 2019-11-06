import { Component } from '@angular/core';
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

@Component({
    selector: 'app-product-list',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})


export class ProductComponent {
    source: LocalDataSource = new LocalDataSource();
    products: Product[] = [];
    categories: Category[] = [];
    settings = {
        actions: false,
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
                type: 'String',
                width: '5%',
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
                valuePrepareFunction: (masterCategoryId) => {
                    if (masterCategoryId != null) {
                        return this.categories.find(category => category.id == masterCategoryId).name;
                    } else {
                        return '';
                    };
                }
            },
            categoryId: {
                title: 'Category',
                width: '5%',
                type: 'String',
                valuePrepareFunction: (categoryId) => {
                    if (categoryId != null) {
                        return this.categories.find(category => category.id == categoryId).name;
                    } else {
                        return '';
                    };
                }
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
                    return this.datePipe.transform(raw, 'dd-MMM-yyyy');
                }
            },
            modifiedDate: {
                title: 'Last modified',
                filter: false,
                compareFunction: sortDate,
                width: '10%',
                valuePrepareFunction: (date) => {
                    const raw = new Date(date);
                    return this.datePipe.transform(raw, 'dd-MMM-yyyy');
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
            },
        },
    }


    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        this.getListCategory();
        this.getAllProducts();
    }

    getAllProducts() {
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
            this.source.load(this.products);
        })
    }

    getListCategory() {
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
            });
        })
    }

    handleChangeStatus(product: Product) {
        const pro = product;
        pro.isActived = !pro.isActived;
        this.source.update(product, pro);
    }
}