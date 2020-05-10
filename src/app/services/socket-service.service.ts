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
    // this.socket = io.connect('http://localhost:3000');
    this.accessChecker.isGranted('notification', 'Order').subscribe(res => {
      if (res === true) {
        this.socket.on('noti-new-order', (order) => {
          this.showToast(3000);
        });

        this.socket.on('send-all-noti', (noti) => {
          console.log(noti)
        })
      }
    });
    return () => this.socket.disconnect();
  }

  add() {
    // this.socket.emit('add-new-order', {
    //   order_id: '123',
    //   name: 'Tran Hoang Giang',
    //   total: 8000,
    //   order_item: [
    //     {
    //       id: '32132',
    //       name: 'dsadsa'
    //     }
    //   ]
    // });

    // this.socket.emit('get-all-noti')
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
