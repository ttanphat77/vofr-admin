import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {NbAccessChecker} from "@nebular/security";


@Component({
  template: `
      <!--      <div *nbIsGranted="['create', 'Product']">-->
      <button [disabled]="!accessChecker.isGranted('edit','Product')" *ngIf="actived" size="small" (click)="deactive()"
              nbButton
              status="danger">Deactive
      </button>
      <button [disabled]="!accessChecker.isGranted('edit', 'Product')" *ngIf="!actived" size="small" (click)="active()"
              nbButton>Active
      </button>
      <!--      </div>-->
  `,
})
export class ActiveButtonRenderComponent implements OnInit {

  public renderValue;
  actived: boolean;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private productService: ProductService,
              private accessChecker: NbAccessChecker) {
  }

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
