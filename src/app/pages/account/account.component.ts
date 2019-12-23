import {Component, OnInit, TemplateRef} from '@angular/core';
import {sortDate, sortName} from "../common/sortDate";
import {ViewActionRenderComponent} from "../order/view-action-render.component";
import {LocalDataSource} from "ng2-smart-table";
import {Order} from "../../models/order.model";
import {Account} from "../../models/account.model";
import {NbDialogService} from "@nebular/theme";
import {DatePipe} from "@angular/common";
import {OrderService} from "../../services/order.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  accounts: Account[] = [];

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
        type: 'String',
        width: '5%',
        filter: false,

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
        width: '5%',
        // renderComponent: DescriptionRenderComponent,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'String',
        width: '5%',
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
        type: 'String',
        width: '15%',
        // renderComponent: DescriptionRenderComponent,
      },
      role: {
        title: 'Role',
        type: 'String',
        width: '10%',
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
        renderComponent: ViewActionRenderComponent,
        // onComponentInitFunction: (instance) => {
        //   instance.save.subscribe((res) => {
        //     if (res.action === 'edit') {
        //       this.handleEdit(res.product);
        //     } else if (res.action === 'delete') {
        //       this.handleDelete(res.product);
        //     }
        //   });
        // },
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

  open(addNewDialog: TemplateRef<any>) {

  }

  getAllData() {
    this.accountService.getAllAccount().subscribe(data => {
      const accountList: any[] = data.data;
      console.log(accountList);
      accountList.forEach(element => {
        const account: Account = new Account();
        account.firstName = element.first_name;
        account.lastName = element.last_name;
        account.email = element.email;
        account.phoneNumber = element.phone_number;
        account.username = element.username;
        account.role = element.role_id;
        account.activated = element.actived;
        account.deleted = element.deleted;
        account.dateCreated = element.date_created;
        account.address = element.address;
        this.accounts.push(account);
      });
      this.source.load(this.accounts);
    });
  }
}
