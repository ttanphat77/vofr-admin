import { Component } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(public accessChecker: NbAccessChecker) { }

  items = MENU_ITEMS.filter(item => {
    return item.title != 'Dashboard';
  });
}
