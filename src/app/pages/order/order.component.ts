import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {Order} from '../../models/order.model';
import {DescriptionRenderComponent} from '../product/description.render.component';
import {Category} from '../../models/category.model';
import {sortDate, sortName} from '../common/sortDate';
import {ActiveButtonRenderComponent} from '../product/activeButton.render.component';
import {ActionRenderComponent} from '../product/action.render.component';
import {DatePipe} from '@angular/common';
import {Product} from '../../models/product.model';
import {Observable} from 'rxjs';
import {OrderService} from '../../services/order.service';
import {ViewActionRenderComponent} from './view-action-render.component';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  newOrder: Order = new Order();
  orders: Order[] = [];
  tableSettings: any = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '5%',
      },
      name: {
        title: 'Customer Name',
        type: 'String',
        width: '10%',
        sort: true,
        sortDirection: 'desc',
        compareFunction: sortName,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'String',
        width: '10%',
        // renderComponent: DescriptionRenderComponent,
      },
      email: {
        title: 'Email',
        type: 'String',
        width: '10%',
        // renderComponent: DescriptionRenderComponent,
      },
      status: {
        title: 'Status',
        type: 'String',
        width: '15%',
        // renderComponent: DescriptionRenderComponent,
      },
      total: {
        title: 'Total',
        type: 'String',
        width: '10%',
      },

      orderDate: {
        title: 'Order date',
        sort: true,
        sortDirection: 'desc',
        width: '20%',
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'h:mm a, d/M/yyyy');
        },
      },
      // button: {
      //   title: '',
      //   type: 'custom',
      //   width: '5%',
      //   valuePrepareFunction: (cell, row) => row,
      //   renderComponent: ActiveButtonRenderComponent,
      //   onComponentInitFunction: (instance) => {
      //     // instance.save.subscribe((row) => {
      //     //   this.handleChangeStatus(row);
      //     // });
      //   },
      //   filter: false,
      //   sort: false,
      // },
      action: {
        title: 'View',
        type: 'custom',
        filter: false,
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ViewActionRenderComponent,
        // onComponentInitFunction: (instance) => {
        //   instance.save.subscribe((res) => {
        //     if (res.action === 'edit') {
        //       this.handleEdit(res.product);
        //     } else if (res.action === 'delete') {
        //       this.handleDelete(res.product);
        //     }
        //   });
        // },
      },
    },
  };

  constructor(private dialogService: NbDialogService,
              private datePipe: DatePipe,
              private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.orderService.getAllOrders().subscribe(data => {
      const orderList: any[] = data.data;
      orderList.forEach(element => {
        if (element.status !== 1) {
          const order: Order = new Order();
          order.id = element.order_id;
          order.name = element.full_name;
          order.total = element.total;
          if (element.status === 2) order.status = 'Paid Order';
          if (element.status === 3) order.status = 'Canceled Order';
          order.phoneNumber = element.phone_number;
          order.orderDate = element.order_date;
          order.email = element.email;
          this.orders.push(order);
        }
      });
      // observable.next(true);
      // return observable.complete();
      // this.tableSettings = Object.assign(
      //   {},
      //   this.tableSettings,
      // );
      this.source.load(this.orders);
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
  }

  handleEdit(order: Order) {
    // const oldProduct = this.products.find(pro => pro.id == newProduct.id);
    // this.source.update(oldProduct, newProduct)
  }

  handleDelete(order: Order) {
    // this.source.remove(product);
  }

  handleChangeStatus(order: Order) {
  }
}
