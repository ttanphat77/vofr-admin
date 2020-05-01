import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItem} from "../../../models/orderItem.model";

@Component({
  selector: 'quantity-action-component',
  templateUrl: './quantity-action-component.component.html',
  styleUrls: ['./quantity-action-component.component.scss']
})
export class QuantityActionComponentComponent implements OnInit {
  orderItem: OrderItem;
  @Input() value: any;
  @Output() increase: EventEmitter<any> = new EventEmitter();


  constructor() {

  }

  ngOnInit() {
    this.orderItem = this.value;
  }

  change(quantity: number) {
    this.orderItem.quantity = this.orderItem.quantity + quantity;
    this.increase.emit({orderItem: this.orderItem});
  }
}
