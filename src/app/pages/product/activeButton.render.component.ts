import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';


@Component({
  template: `
    <button *ngIf="actived" size="small" (click)="deactive()" nbButton status="danger">Deactive</button>
    <button *ngIf="!actived" size="small" (click)="active()" nbButton>Active</button>
  `,
})
export class ActiveButtonRenderComponent implements OnInit {

  public renderValue;
  actived: boolean;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private productService: ProductService) {  }

  ngOnInit() {
    this.renderValue = this.value;
    this.actived = this.renderValue.isActived;
  }

  active() {
    this.productService.changeStatus(this.renderValue.id, true).subscribe()
    this.save.emit(this.renderValue);
  }

  deactive() {
    this.productService.changeStatus(this.renderValue.id, false).subscribe()
    this.save.emit(this.renderValue);
  }


}
