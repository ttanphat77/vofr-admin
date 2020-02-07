/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketServiceService} from "./services/socket-service.service";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  // private disposeConnection: VoidFunction;


  constructor() {
  }

  ngOnInit() {
    // this.disposeConnection = this.socketService.connect();
  }

  // ngOnDestroy() {
  // this.disposeConnection();
  // }
}
