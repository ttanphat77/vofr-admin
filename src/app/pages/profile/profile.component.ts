import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isEdit = false;
  public user: Account = new Account();

  constructor(
    private authService: NbAuthService,
    private accountService: AccountService,
    private toastrService: NbToastrService
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
}
