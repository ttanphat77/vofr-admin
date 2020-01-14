import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket;

  constructor() {
  }

  connect() {
    this.socket = io.connect('http://23.94.26.75');
    this.socket.on('noti-new-order', (order) => {
      alert('new order');
    });
    return () => this.socket.disconnect();
  }

  add() {
    this.socket.emit('add-new-order');
  }
}
