import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../models/account.model";

@Component({
  selector: 'avatar-render',
  templateUrl: './avatar-render.component.html',
  styleUrls: ['./avatar-render.component.scss']
})
export class AvatarRenderComponent implements OnInit {
  account: Account;


  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.account = this.value;
  }

}
