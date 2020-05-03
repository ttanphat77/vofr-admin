import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItem} from "../../../models/orderItem.model";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})
export class DeleteActionComponent implements OnInit {
  orderItem: OrderItem;
  order: Order;
  @Input() value: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.orderItem = this.value[0];
    this.order = this.value[1];
  }

  deleteItem() {
    this.delete.emit({orderItem: this.orderItem});
    this.orderItem = new OrderItem();
  }

}
