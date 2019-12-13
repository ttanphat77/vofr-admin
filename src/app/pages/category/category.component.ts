import {Component, TemplateRef} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {DatePipe} from '@angular/common';
import {sortDate} from '../common/sortDate';
import {SubCategoryRenderComponent} from './subCategory.render.component';
import {ActionRenderComponent} from './action.render.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-category-list',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})


export class CategoryComponent {
  isMaster: boolean;
  source_category: LocalDataSource = new LocalDataSource();
  source_subCategory: LocalDataSource = new LocalDataSource();
  newCategory: Category = new Category();
  categories: Category[];
  chosenCategory: Category;
  settings_category = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '5%',
      },
      name: {
        title: 'Name',
        type: 'custom',
        width: '10%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: SubCategoryRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.handleLoadSubCategory(row);
          });
        },
      },
      createdDate: {
        title: 'Created date',
        filter: false,
        sort: true,
        sortDirection: 'desc',
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'd/M/yyyy, h:mm a');
        }
      },
      modifiedDate: {
        title: 'Last modified date',
        filter: false,
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'd/M/yyyy, h:mm a');
        }
      },
      action: {
        title: '',
        type: 'custom',
        filter: false,
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ActionRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((res) => {
            this.getAllCategories();
          });
        },
      }
    }
  }

  constructor(
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = [];
    this.categoryService.getAllCategory().subscribe(data => {
      var listCategory: any[] = data.data;
      listCategory.forEach(element => {
        var category: Category = new Category();
        category.id = element.category_id;
        category.name = element.category_name;
        category.imageUrl = element.category_image;
        category.createdDate = element.date_created;
        category.modifiedDate = element.date_modified;
        category.isActived = element.actived;
        category.masterCategoryId = element.master_category_id;
        this.categories.push(category);
      });
      this.loadMasterCategory();
      this.handleLoadSubCategory(this.chosenCategory);
    })
  }

  loadMasterCategory() {
    var listMaster = this.categories.filter((cate) => cate.masterCategoryId == null);
    this.source_category.load(listMaster);
  }

  handleLoadSubCategory(category: Category) {
    if (category) {
      this.chosenCategory = category;
      var listSub = this.categories.filter((cate) => {
        return cate.masterCategoryId == this.chosenCategory.id
      });
      this.source_subCategory.load(listSub);
    }
  }

  createCategory() {
    this.newCategory.masterCategoryId = this.isMaster ? null : this.chosenCategory.id;
    this.categoryService.createCategory(this.newCategory).subscribe(res => {
      this.getAllCategories();
    })
  }

  openAddNew(dialog: TemplateRef<any>, isMaster) {
    this.isMaster = isMaster;
    this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
  }
}
