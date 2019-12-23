import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  template: `
      <button *ngIf="actived" size="small" (click)="deactive()" nbButton status="danger">Deactive</button>
      <button *ngIf="!actived" size="small" (click)="active()" nbButton>Active</button>
  `,
})
export class ActiveAccountButtonComponent implements OnInit {
  public renderValue;
  actived: boolean;
  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.renderValue = this.value;
    this.actived = this.renderValue.activated;
  }

  active() {
    this.accountService.changeStatus(this.renderValue.id, true).subscribe();
    this.save.emit(this.renderValue);
  }

  deactive() {
    this.accountService.changeStatus(this.renderValue.id, false).subscribe();
    this.save.emit(this.renderValue);
  }
}
