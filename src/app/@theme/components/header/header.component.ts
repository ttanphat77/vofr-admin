import {ApplicationRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {AccountService} from '../../../services/account.service';
import {Account} from '../../../models/account.model';
import {Subject} from 'rxjs';
import {NotificationService} from "../../../services/notification.service";
import {SocketServiceService} from "../../../services/socket-service.service";
import io from 'socket.io-client';
import {Router} from "@angular/router";


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  orders = [];
  unseenNoti: number;
  private disposeConnection: VoidFunction;
  private socket;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: Account;

  userMenu = [
    {title: 'Profile', link: 'pages/profile'},
    {title: 'Log out', link: 'auth/logout'}
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private accountService: AccountService,
              private notificationService: NotificationService,
              private socketService: SocketServiceService,
              private router: Router) {
  }


  ngOnInit() {
    this.notificationService.getAllNoti().subscribe(res => {
      // let itemsSorted  = $filter('orderBy')(res, 'date');
      this.orders = res;
      this.orders.sort((a, b) => a.date > b.date ? -1 : 1);
      this.unseenNoti = this.orders.filter(item => item.seen === false).length;
    });

    this.socket = io.connect('https://protected-peak-19050.herokuapp.com/');
    this.socket.on('noti-new-order', () => {
      this.notificationService.getAllNoti().subscribe(res => {
        this.orders = res;
        this.orders.sort((a, b) => a.order.order_date > b.order.order_date ? -1 : 1);
        this.unseenNoti = this.orders.filter(item => item.seen === false).length;
      });
    })

    this.socket.on('send-all-noti', (noti) => {
      // this.notificationService.getAllNoti().subscribe(res => {
      this.orders = noti;
      this.orders.sort((a, b) => a.order.order_date > b.order.order_date ? -1 : 1);
      this.unseenNoti = this.orders.filter(item => item.seen === false).length;
      // });
    })

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
    // this.disposeConnection();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  openNoti(event) {
    // this.notificationService.getAllNoti().subscribe(res => {
    //   this.orders = res;
    // })
    this.socket.emit('get-all-noti')
  }

  navigateToCashier(id) {
    this.router.navigateByUrl('/pages/cashier?id=' + id);
  }
}
