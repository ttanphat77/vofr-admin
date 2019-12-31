import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
      <ngx-one-column-layout>
          <nb-menu [items]="menu"></nb-menu>
          <router-outlet></router-outlet>
      </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[];

  constructor(public accessChecker: NbAccessChecker) { }

  ngOnInit(): void {
    MENU_ITEMS.forEach(item => {
      if (item.title != 'Dashboard') {
        this.accessChecker.isGranted('view', item.title).subscribe(res => {
          item.hidden = !res;
        });
      }
    })
    this.menu = MENU_ITEMS;
  }
}
