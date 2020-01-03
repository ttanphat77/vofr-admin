import { Component } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  items: NbMenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = MENU_ITEMS.filter(item => !item.hidden && item.title !== 'Dashboard')
  }


}
