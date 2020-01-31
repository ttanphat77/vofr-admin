import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable} from "rxjs";
import {NbGlobalLogicalPosition, NbToastrService} from "@nebular/theme";
import {NbAccessChecker} from "@nebular/security";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket;
  private index: number = 0;


  constructor(private toastrService: NbToastrService,
              private accessChecker: NbAccessChecker) {
  }

  connect() {
    this.socket = io.connect('https://protected-peak-19050.herokuapp.com/');
    this.accessChecker.isGranted('notification', 'Order').subscribe(res => {
      if (res === true) {
        this.socket.on('noti-new-order', (order) => {
          this.showToast(3000);
        });
      }
    });
    return () => this.socket.disconnect();
  }

  add() {
    this.socket.emit('add-new-order');
  }


  showToast(duration) {
    this.toastrService.show(
      'Customer has ordered',
      `This is order number: ${++this.index}`,
      {
        duration,
        limit: 3,
        position: NbGlobalLogicalPosition.BOTTOM_END,
        status: "info"
      });
  }
}
