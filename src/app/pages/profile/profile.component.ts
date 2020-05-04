import {Component, OnInit, TemplateRef} from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import {NbToastrService, NbGlobalLogicalPosition, NbDialogService} from '@nebular/theme';
import {Router} from "@angular/router";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dialogRef: any;

  public isEdit = false;
  public user: Account = new Account();
  public oldPassword: string;
  public newPassword: string;
  public newRepassword: string;
  public errors: string;

  constructor(
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private accountService: AccountService,
    private toastrService: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.accountService.getUserById(token.getPayload().unique_name).subscribe(data => {
            var account = data.data[0];
            this.user = new Account();
            this.user.id = account.account_id;
            this.user.firstName = account.first_name;
            this.user.lastName = account.last_name;
            this.user.email = account.email;
            this.user.phoneNumber = account.phone_number;
            this.user.username = account.username;
            this.user.role = account.role_id;
            this.user.activated = account.actived;
            this.user.password = account.password;
            this.user.roleName = account.role_name;
            this.user.deleted = account.deleted;
            this.user.dateCreated = account.date_created;
            this.user.address = account.address;
            this.user.image = account.image_user;
          })
        }

      });
  }

  onClickEdit() {
    this.isEdit = true;
  }

  onCancel() {
    this.getUserInfo();
    this.isEdit = false;
  }

  onSave() {
    let position: NbGlobalLogicalPosition.BOTTOM_END;
    this.accountService.updateAccount(this.user).subscribe((rs) => {
      if (rs.success) {
        this.toastrService.success(
          'Profile updated.',
          'Successful',
          { position: NbGlobalLogicalPosition.BOTTOM_END }
        );
      } else {
        this.toastrService.danger(
          'Please try again!',
          'Failed to update profile',
          { position: NbGlobalLogicalPosition.BOTTOM_END }
        );
        this.getUserInfo();
      }
      this.isEdit = false;
    })
  }

  open(dialog: TemplateRef<any>) {
    this.newPassword = '';
    this.oldPassword = '';
    this.newRepassword = '';
    this.dialogRef = this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true, autoFocus: false, closeOnEsc: false});
  }
  test() {
    this.accountService.changePassword('3213','32132').subscribe(res=> {
      console.log('done')
    });
  }

  changePassword(dialog: TemplateRef<any>) {
    if(this.newPassword !== this.newRepassword) {
      return this.errors = 'Password does not match'
    }

    this.accountService.changePassword(this.oldPassword, this.newPassword).subscribe(res => {
      // if(res === null) {
      //   return this.errors = 'Error Server';
      // }
      if (res.success === false) {
        return this.errors = res.message;
      }
      if (res.success === true) {
        // this.dialogService.open(dialog, {});
        return this.router.navigateByUrl('/auth/logout');
         // this.dialogRef.close();
      }
      if (res.status === 400) {
        return this.errors = res.error.message || res.message;
      }
      if (res.status === 500) {
        return this.errors = 'Server Error';
      }
    });
  }
}
