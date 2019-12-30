import { Component } from '@angular/core';
import {MENU_ITEMS} from '../pages-menu';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  items = MENU_ITEMS.filter(item => {
    return item.title != 'Dashboard';
  });
}
