import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from "@angular/core";
import {NbDialogService} from "@nebular/theme";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";

@Component({
  templateUrl: 'action.account.component.html',
})

export class ActionAccountComponent implements OnInit {
  account: Account;
  errors: string;
  dialogRef: any;


  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: NbDialogService,
              private accountService: AccountService
  ) {

  }

  onSubmit(dialog: TemplateRef<any>) {
    this.accountService.updateAccount(this.value).subscribe(res => {
      if (res.success === true) {
        this.save.emit({account: this.value, action: 'edit'});
        this.dialogService.open(dialog, {});
        return this.dialogRef.close();
      }
      if (res.status === 400) {
        return this.errors = res.error.message;
      }
      if (res.status === 500) {
        return this.errors = 'Server Error';
      }
    });
  }


  ngOnInit(): void {
    this.account = this.value;
  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      hasScroll: true,
      autoFocus: false,
      closeOnEsc: false
    });
  }

  saveAccount() {
    this.accountService.updateAccount(this.value).subscribe();
    this.save.emit({account: this.value, action: 'edit'});
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.value.id).subscribe();
    this.save.emit({account: this.value, action: 'delete'});
  }
}
