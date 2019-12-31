import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from "@angular/core";
import {NbDialogService} from "@nebular/theme";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";

@Component({
  templateUrl: 'role.select.component.html',
})
export class RoleSelectComponent implements OnInit {
  account: Account;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private accountService: AccountService
  ) {

  }

  ngOnInit(): void {
    this.account = this.value;
    console.log('test ', this.value.role);
  }

  changeRole() {
    console.log(this.account.role);
    this.accountService.changeRole(this.value.id, this.account.role).subscribe();
  }
}
