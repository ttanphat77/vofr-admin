import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItem} from "../../../models/orderItem.model";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'quantity-action-component',
  templateUrl: './quantity-action-component.component.html',
  styleUrls: ['./quantity-action-component.component.scss']
})
export class QuantityActionComponentComponent implements OnInit {
  orderItem: OrderItem;
  order: Order;
  @Input() value: any;
  @Output() increase: EventEmitter<any> = new EventEmitter();


  constructor() {

  }

  ngOnInit() {
    this.orderItem = this.value[0];
    this.order = this.value[1]
  }

  change(quantity: number) {
    this.orderItem.quantity = this.orderItem.quantity + quantity;
    this.increase.emit({orderItem: this.orderItem});
  }
}
