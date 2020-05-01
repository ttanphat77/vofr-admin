import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItem} from "../../../models/orderItem.model";

@Component({
  selector: 'delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.scss']
})
export class DeleteActionComponent implements OnInit {
  orderItem: OrderItem;
  @Input() value: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.orderItem = this.value;
  }

  deleteItem() {
    this.delete.emit({orderItem: this.orderItem});
    this.orderItem = new OrderItem();
  }

}
