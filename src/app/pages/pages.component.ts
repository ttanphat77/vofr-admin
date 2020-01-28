import {Component, OnDestroy, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {NbAccessChecker} from '@nebular/security';
import {NbMenuItem} from '@nebular/theme';
import {SocketServiceService} from "../services/socket-service.service";

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
export class PagesComponent implements OnInit, OnDestroy {
  menu: NbMenuItem[];
  private disposeConnection: VoidFunction;


  constructor(public accessChecker: NbAccessChecker,
              private socketService: SocketServiceService) {
  }

  ngOnInit(): void {
    MENU_ITEMS.forEach(item => {
      this.accessChecker.isGranted('view', item.title).subscribe(res => {
        item.hidden = !res;
      });
    })
    this.menu = MENU_ITEMS;

    this.disposeConnection = this.socketService.connect();

  }

  ngOnDestroy(): void {
    this.disposeConnection();
  }
}
