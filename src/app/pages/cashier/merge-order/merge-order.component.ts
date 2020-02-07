import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItem} from "../../../models/orderItem.model";
import {Order} from "../../../models/order.model";

@Component({
  selector: 'merge-order',
  templateUrl: './merge-order.component.html',
  styleUrls: ['./merge-order.component.scss']
})
export class MergeOrderComponent implements OnInit {
  order: Order;
  available: boolean;
  @Input() value: any;
  @Output() check: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.order = this.value;
    this.available = this.order.method === 'Pay at cashier';
  }

  toggle($event: boolean) {
    this.check.emit({
      value: $event,
      order: this.order
    })
  }
}
