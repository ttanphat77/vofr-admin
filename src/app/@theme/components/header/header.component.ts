import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../models/account.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: Account;

  userMenu = [{ title: 'Profile' }, { title: 'Log out', link: 'auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private accountService: AccountService,) {
  }

  ngOnInit() {

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
