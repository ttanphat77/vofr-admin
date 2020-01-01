import { Component } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  items: NbMenuItem[];

  constructor(public accessChecker: NbAccessChecker) {
  }

  ngOnInit(): void {
    this.items = MENU_ITEMS.filter(item => !item.hidden && item.title !== 'Dashboard')
  }


}
