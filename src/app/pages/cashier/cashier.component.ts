import {Component, OnInit, TemplateRef} from '@angular/core';
import {sortDate, sortName} from "../common/sortDate";
import {NbDialogService} from "@nebular/theme";
import {DatePipe} from "@angular/common";
import {Order} from "../../models/order.model";
import {OrderService} from "../../services/order.service";
import {LocalDataSource} from "ng2-smart-table";
import {OrderDetailService} from "../../services/order-detail.service";
import {ProductService} from "../../services/product.service";
import {OrderItem} from "../../models/orderItem.model";
import {Subject} from "rxjs";
import {Product} from "../../models/product.model";
import {DescriptionRenderComponent} from "../product/description.render.component";
import {QuantityActionComponentComponent} from "./quantity-action-component.component";
import {DeleteActionComponent} from "./delete-action.component";
import {OrderActionComponent} from "./order-action.component";

@Component({
  selector: 'cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
})
export class CashierComponent implements OnInit {
  orders: Order[] = [];
  productToAdd: Product;
  orderDetails: OrderItem[] = [];
  dialogRef: any;
  source: LocalDataSource = new LocalDataSource();
  detailSource: LocalDataSource = new LocalDataSource();
  productSource: LocalDataSource = new LocalDataSource();
  choosenOrder: Order;
  newItem: OrderItem = new OrderItem();
  results: Object;
  searchTerm$ = new Subject<string>();
  usersArray: Product[] = [];
  searchText: string;
  newOrderItem: OrderItem = new OrderItem();
  newOrder: Order;

  orderSettings: any = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '4%',
      },
      name: {
        title: 'Customer Name',
        type: 'String',
        width: '5%',
        sort: true,
        sortDirection: 'desc',
        compareFunction: sortName,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'String',
        width: '5%',
        // renderComponent: DescriptionRenderComponent,
      },
      email: {
        title: 'Email',
        type: 'String',
        width: '5%',
        // renderComponent: DescriptionRenderComponent,
      },
      address: {
        title: 'Address',
        type: 'String',
        width: '5%',
        // renderComponent: DescriptionRenderComponent,
      },
      // total: {
      //   title: 'Total',
      //   type: 'String',
      //   width: '10%',
      // },
      method: {
        title: 'Method',
        sort: true,
        width: '1%',
        type: 'String'
      },
      orderDate: {
        title: 'Order date',
        sort: true,
        sortDirection: 'desc',
        width: '5%',
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'h:mm a, d/M/yyyy');
        },
      },
      action: {
        title: '',
        type: 'custom',
        filter: false,
        width: '1%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: OrderActionComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((value) => {
            this.getAllData();
          });
        },
      },
    },
  };
  orderDetailSettings: any = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'String',
        width: '5%',
        // sort: true,
        // sortDirection: 'desc',
        // compareFunction: sortName,
      },
      price: {
        title: 'Price',
        type: 'String',
        width: '5%',
      },
      quantity: {
        title: 'Quantity',
        type: 'custom',
        width: '3%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: QuantityActionComponentComponent,
        onComponentInitFunction: (instance) => {
          instance.increase.subscribe((value) => {
            console.log(value);
            let index = this.orderDetails.findIndex(value1 => value1.id === value.orderItem.id);
            if (index !== -1) {
              this.orderDetails[index] = value.orderItem;
              this.detailSource.load(this.orderDetails);
            }
          });
        },

        // renderComponent: DescriptionRenderComponent,
      },
      action: {
        title: 'Delete',
        type: 'custom',
        filter: false,
        width: '1%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: DeleteActionComponent,
        onComponentInitFunction: (instance) => {
          instance.delete.subscribe((value) => {
            let index = this.orderDetails.findIndex(value1 => value1.id === value.orderItem.id);
            if (index !== -1) {
              this.orderDetails.splice(index, 1);
              this.detailSource.load(this.orderDetails);
            }
          });
        },
      },
    },
  };
  productSettings: any = {
    actions: false,
    columns: {
      name: {
        title: 'Name',
        type: 'String',
        width: '5%',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'custom',
        width: '25%',
        filter: false,
        renderComponent: DescriptionRenderComponent,
        // renderComponent: DescriptionRenderComponent,
      }
    },
  };


  constructor(
    private dialogService: NbDialogService,
    private datePipe: DatePipe,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.getAllData();
  }

  onUserRowSelect(event): void {
    this.choosenOrder = event.data;
    this.getAllDataOrderItem(this.choosenOrder.id);
  }

  getAllData() {
    this.orders = [];
    this.orderService.getAllOrders().subscribe(data => {
      const orderList: any[] = data.data;
      orderList.forEach(element => {
        if (element.status === 1) {
          const order: Order = new Order();
          order.id = element.order_id;
          order.name = element.full_name;
          order.total = element.total;
          switch (element.method) {
            case 1:
              order.method = 'Pay at cashier';
              break;
            case 2:
              order.method = 'Pay by Paypal';
              break;
            case 0:
              order.method = 'Cash on delivery';
              break;
          }
          if (element.status === 1) order.status = 'Processing';
          order.phoneNumber = element.phone_number;
          order.address = element.address;
          order.orderDate = element.order_date;
          order.email = element.email;
          this.orders.push(order);
        }
      });
      this.source.load(this.orders);
    });
  }

  // get(id: string): Observable<OrderItem[]> {
  //   // this.orderDetails = [];
  //   this.orderDetailService.getOrderDetailById(id).subscribe(data => {
  //     const orderDetailList: any[] = data.data;
  //     orderDetailList.forEach(element => {
  //       const orderItem: OrderItem = new OrderItem();
  //       orderItem.id = element.order_item_id;
  //       orderItem.price = element.price;
  //       orderItem.quantity = element.quantity;
  //       this.productService.getProductById(element.product_id).subscribe(product => {
  //         const productDetail: any = product.data;
  //         orderItem.name = productDetail[0].product_name;
  //       });
  //       this.orderDetails.push(orderItem);
  //     });
  //     this.detailSource.load(this.orderDetails).catch(err => console.log(err));
  //   });
  //   return tempOrder;
  // }


  getAllDataOrderItem(id: string) {
    this.orderDetails = [];
    this.orderDetailService.getOrderDetailById(id).subscribe(data => {
      const orderDetailList: any[] = data.data;
      orderDetailList.forEach(element => {
        const orderItem: OrderItem = new OrderItem();
        orderItem.id = element.order_item_id;
        orderItem.price = element.price;
        orderItem.quantity = element.quantity;
        orderItem.name = element.product.product_name;
        orderItem.orderId = element.order_id;
        orderItem.productId = element.product.product_id;
        this.orderDetails.push(orderItem);
      });
      this.detailSource.load(this.orderDetails);
    })
  }


  openAddNew(dialog: TemplateRef<any>, b: number) {
    if (b === 1) {
      this.newOrder = new Order();
      this.dialogRef = this.dialogService.open(dialog, {
        hasBackdrop: true,
        hasScroll: true,
        autoFocus: false,
        closeOnEsc: false
      });
    } else if (b === 2) {
      this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
      this.getAllProduct();
    } else if (b === 3) {
      this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
    }

  }

  getAllProduct() {
    this.usersArray = [];
    this.productService.getAllProduct().subscribe(data => {
      let listProduct: any[] = (data as any).data;
      listProduct.forEach(element => {
        let product: Product = new Product();
        product.id = element.product_id;
        product.name = element.product_name;
        product.price = element.product_price;
        product.description = element.description;
        product.createdDate = element.date_created;
        product.modifiedDate = element.dated_modified;
        product.isActived = element.actived;
        product.categoryId = element.category_id;
        product.masterCategoryId = element.master_category_id;
        this.usersArray.push(product);
      });
      this.productSource.load(this.usersArray);
    })
  }

  search(value: any) {
    this.usersArray = [];
    this.productService.searchProduct(value).subscribe(data => {
      let listProduct: any[] = (data as any).data;
      listProduct.forEach(element => {
        let product: Product = new Product();
        product.id = element.product_id;
        product.name = element.product_name;
        product.price = element.product_price;
        product.description = element.description;
        product.createdDate = element.date_created;
        product.modifiedDate = element.dated_modified;
        product.isActived = element.actived;
        product.categoryId = element.category_id;
        product.masterCategoryId = element.master_category_id;
        this.usersArray.push(product);
      });
      this.productSource.load(this.usersArray);
    })
  }

  chooseNewProduct(event): void {
    this.productToAdd = event.data;
  }

  addNewOrderItem(product: Product) {
    this.newOrderItem = new OrderItem();
    this.newOrderItem.name = product.name;
    this.newOrderItem.quantity = 1;
    this.newOrderItem.price = product.price;
    this.newOrderItem.productId = product.id;
    this.newOrderItem.orderId = this.choosenOrder.id;
    let index = this.orderDetails.findIndex(item => item.productId === this.newOrderItem.productId);
    if (index !== -1) {
      this.orderDetails[index].quantity = this.orderDetails[index].quantity + 1;
    }
    if (index === -1) this.orderDetails.push(this.newOrderItem);

    this.detailSource.load(this.orderDetails);
  }

  saveOrder(dialog: TemplateRef<any>) {
    this.orderDetailService.updateOrderDetail(this.orderDetails).subscribe(res => {
      console.log(res);
      this.openAddNew(dialog, 3);
    });
  }

  payOrder() {
    this.orderService.changeStatus(this.choosenOrder.id, 2).subscribe(res => {
      this.source.remove(this.choosenOrder);
      this.choosenOrder = null;
    })
  }

  cancelOrder() {
    this.orderService.changeStatus(this.choosenOrder.id, 3).subscribe(res => {
      this.source.remove(this.choosenOrder);
      this.choosenOrder = null;
    })
  }

  caculateTotal() {
    if (this.orderDetails) {
      return this.orderDetails.reduce((total, cartItem) =>
        total + cartItem.quantity * cartItem.price, 0)
    }
  }

  addNewOrder() {
    console.log(this.newOrder);
    this.orderService.addNewOrder(this.newOrder).subscribe(res => {
      this.choosenOrder = null;
      this.getAllData();
    })
  }

  onSubmit(success: TemplateRef<any>) {
    this.addNewOrder();
    this.dialogRef.close();
    return this.dialogService.open(success, {});

  }
}
