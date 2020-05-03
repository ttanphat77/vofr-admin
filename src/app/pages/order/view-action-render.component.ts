import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {DatePipe} from '@angular/common';
import {OrderService} from '../../services/order.service';
import {LocalDataSource} from 'ng2-smart-table';
import {Order} from '../../models/order.model';
import {sortDate, sortName} from '../common/sortDate';
import {OrderItem} from '../../models/orderItem.model';
import {OrderDetailService} from '../../services/order-detail.service';
import {ProductService} from '../../services/product.service';
import {FormatPriceComponent} from "./format-price/format-price.component";

@Component({
  templateUrl: './view-action-render.component.html',
})
export class ViewActionRenderComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  order: Order;
  orders: OrderItem[] = [];
  tableSettings: any = {
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
        width: '5%',
        sort: true,
        sortDirection: 'desc',
        compareFunction: sortName,
      },
      price: {
        title: 'Price',
        type: 'custom',
        width: '5%',
        renderComponent: FormatPriceComponent
      },
      quantity: {
        title: 'Quantity',
        type: 'String',
        width: '25%',
        // renderComponent: DescriptionRenderComponent,
      },
      // orderDate: {
      //   title: 'Order date',
      //   sort: true,
      //   sortDirection: 'desc',
      //   width: '10%',
      //   compareFunction: sortDate,
      //   valuePrepareFunction: (date) => {
      //     const raw = new Date(date);
      //     return this.datePipe.transform(raw, 'd/M/yyyy, h:mm a');
      //   },
      // },
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
      // action: {
      //   title: 'View',
      //   type: 'custom',
      //   filter: false,
      //   width: '5%',
      //   renderComponent: ViewActionRenderComponent,
      // onComponentInitFunction: (instance) => {
      //   instance.save.subscribe((res) => {
      //     if (res.action === 'edit') {
      //       this.handleEdit(res.product);
      //     } else if (res.action === 'delete') {
      //       this.handleDelete(res.product);
      //     }
      //   });
      // },
      // },
    },
  };

  @Input() value;


  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: NbDialogService,
              private datePipe: DatePipe,
              private orderDetailService: OrderDetailService,
              private productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.order = this.value;
    this.getOrderDetailById(this.order.id);
  }

  getOrderDetailById(id: string) {
    this.orderDetailService.getOrderDetailById(id).subscribe(data => {
      const orderDetailList: any[] = data.data;
      orderDetailList.forEach(element => {
        const orderItem: OrderItem = new OrderItem();
        orderItem.id = element.order_item_id;
        orderItem.price = element.price;
        orderItem.quantity = element.quantity;
        this.productService.getProductById(element.product_id).subscribe(product => {
          const productDetail: any = product.data;
          orderItem.name = productDetail[0].product_name;
        });
        this.orders.push(orderItem);
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

}
