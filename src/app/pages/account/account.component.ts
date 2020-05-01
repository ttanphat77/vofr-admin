import {Component, OnInit, TemplateRef} from '@angular/core';
import {sortDate} from "../common/sortDate";
import {ViewActionRenderComponent} from "../order/view-action-render.component";
import {LocalDataSource} from "ng2-smart-table";
import {Account} from "../../models/account.model";
import {NbDialogService} from "@nebular/theme";
import {DatePipe} from "@angular/common";
import {AccountService} from "../../services/account.service";
import {ActiveAccountButtonComponent} from "./active-account-button.component";
import {Product} from "../../models/product.model";
import {ActionAccountComponent} from "./action.account.component";
import {RoleSelectComponent} from "./role.select.component";
import {AvatarRenderComponent} from "./avatar-render/avatar-render.component";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  dialogRef: any;
  source: LocalDataSource = new LocalDataSource();
  accounts: Account[] = [];
  account: Account;
  model: any = {};
  errors: string;
  tableSettings: any = {
    actions: false,
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'String',
      //   width: '5%',
      // },
      image: {
        title: 'Avatar',
        type: 'custom',
        width: '5%',
        filter: false,
        valuePrepareFunction: (cell, row) => row,
        renderComponent: AvatarRenderComponent,
      },
      firstName: {
        title: 'First Name',
        type: 'String',
        width: '5%',
      },
      lastName: {
        title: 'Last Name',
        type: 'String',
        width: '5%',
      },
      email: {
        title: 'Email',
        type: 'String',
        width: '15%',
        // renderComponent: DescriptionRenderComponent,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'String',
        width: '10%',
        // renderComponent: DescriptionRenderComponent,
      },
      username: {
        title: 'Username',
        type: 'String',
        width: '5%',
        // renderComponent: DescriptionRenderComponent,
      },
      dateCreated: {
        title: 'Created Date',
        sort: true,
        sortDirection: 'desc',
        width: '5%',
        compareFunction: sortDate,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'h:mm a, d/M/yyyy');
        },
      },
      status: {
        title: 'Status',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ActiveAccountButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.handleChangeStatus(row);
          });
        },
        filter: false,
        sort: false,
        // renderComponent: DescriptionRenderComponent,
      },
      role: {
        editable: true,
        title: 'Role',
        type: 'custom',
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: RoleSelectComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.handleChangeStatus(row);
          });
        },
      },
      //
      // orderDate: {
      //   title: 'Order date',
      //   sort: true,
      //   sortDirection: 'desc',
      //   width: '20%',
      //   compareFunction: sortDate,
      //   valuePrepareFunction: (date) => {
      //     const raw = new Date(date);
      //     return this.datePipe.transform(raw, 'h:mm a, d/M/yyyy');
      //   },
      // },
      // button: {
      //   title: '',
      //   type: 'custom',
      //   width: '5%',
      //   valuePrepareFunction: (cell, row) => row,
      //   renderComponent: ActiveButtonRenderComponent,
      //   onComponentInitFunction: (instance) => {
      //     // instance.save.subscribe((row) => {
      //     //   this.handleChangeStatus(row);
      //     // });
      //   },
      //   filter: false,
      //   sort: false,
      // },
      action: {
        title: 'Action',
        type: 'custom',
        filter: false,
        width: '5%',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ActionAccountComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((res) => {
            if (res.action === 'edit') {
              this.handleEdit(res.account);
            } else if (res.action === 'delete') {
              this.handleDelete(res.account);
            }
          });
        },
      },
    },
  };

  constructor(private dialogService: NbDialogService,
              private datePipe: DatePipe,
              private accountService: AccountService,) {
  }

  ngOnInit() {
    this.getAllData();
  }

  open(dialog: TemplateRef<any>) {
    this.account = new Account();
    this.dialogRef = this.dialogService.open(dialog, {
      hasBackdrop: true,
      hasScroll: true,
      autoFocus: false,
      closeOnEsc: false,
    });
  }

  getAllData() {
    this.accounts = [];
    this.accountService.getAllAccount().subscribe(data => {
      const accountList: any[] = data.data;
      accountList.forEach(element => {

        if (element.role_id === 1 || element.role_id === 3) {
          const account: Account = new Account();
          account.id = element.account_id;
          account.firstName = element.first_name;
          account.lastName = element.last_name;
          account.email = element.email;
          account.phoneNumber = element.phone_number;
          account.username = element.username;
          account.role = element.role_id;
          account.activated = element.actived;
          account.password = element.password;
          account.roleName = element.role_name;
          account.deleted = element.deleted;
          account.dateCreated = element.date_created;
          account.address = element.address;
          account.image = element.image_user;
          this.accounts.push(account);
        }
      });
      this.source.load(this.accounts);
    });
  }

  handleChangeStatus(account: Account) {
    const acc = account;
    acc.activated = !acc.activated;
    this.source.update(account, acc);
  }

  handleEdit(newAccount: Account) {
    const oldProduct = this.accounts.find(acc => acc.id == newAccount.id);
    this.source.update(oldProduct, newAccount);
  }

  handleDelete(account: Account) {
    this.source.remove(account);
  }

  onSubmit(dialog: TemplateRef<any>) {
    this.accountService.addNewAccount(this.account).subscribe(res => {
      if (res.success === true) {
        this.getAllData();
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
}
