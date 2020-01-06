import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {Order} from "../../models/order.model";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'order-action',
  templateUrl: './order-action.component.html',
  styleUrls: ['./order-action.component.scss']
})
export class OrderActionComponent implements OnInit {

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  order: Order;
  dialogRef: any;

  constructor(private dialogService: NbDialogService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.order = this.value;

  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      hasScroll: true,
      autoFocus: false,
      closeOnEsc: false
    })
  }

  saveOrderInformation() {
    this.orderService.updateCustomerInformation(this.order).subscribe(res => {
      this.save.emit({action: 'save'});
    });
  }

  cancel() {
    this.save.emit({action: 'cancel'});
  }

  onSubmit(success: any) {
    this.saveOrderInformation();
    this.dialogRef.close();
    return this.dialogService.open(success, {});
  }
}
