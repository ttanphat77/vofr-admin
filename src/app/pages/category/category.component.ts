import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { DatePipe } from '@angular/common';
import { sortDate } from '../common/sortDate';

@Component({
    selector: 'app-category-list',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})


export class CategoryComponent {
    source_category: LocalDataSource = new LocalDataSource();
    categories: Category[] = [];
    settings_category = {
        actions: false,
        columns: {
            id: {
                title: 'ID',
                type: 'String',
                width: '5%',
                filter: false,
            },
            name: {
                title: 'Name',
                type: 'String',
                width: '10%',
                filter: false,
            },
            createdDate: {
                title: 'Created date',
                filter: false,
                sort: true,
                sortDirection: 'desc',
                compareFunction: sortDate,
                valuePrepareFunction: (date) => {
                    const raw = new Date(date);
                    return this.datePipe.transform(raw, 'dd-MMM-yyyy');
                }
            },
            modifiedDate: {
                title: 'Last modified date',
                filter: false,
                compareFunction: sortDate,
                valuePrepareFunction: (date) => {
                    const raw = new Date(date);
                    return this.datePipe.transform(raw, 'dd-MMM-yyyy');
                }
            },
        }
    }

    constructor(
        private categoryService: CategoryService,
        private datePipe: DatePipe,
    ) {
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getAllCategory().subscribe(data => {
            var listCategory: any[] = data.data;
            listCategory.forEach(element => {
                if (element.master_category_id == null) {
                    var category: Category = new Category();
                    category.id = element.category_id;
                    category.name = element.category_name;
                    category.createdDate = element.date_created;
                    category.modifiedDate = element.date_modified;
                    category.isActived = element.actived;
                    this.categories.push(category);
                }
            });
            this.source_category.load(this.categories);
        })
    }
}