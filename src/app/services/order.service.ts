import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Order} from '../models/order.model';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(apiUrl + '/order')
      .pipe(tap(_ => console.log('fetched orders')),
        catchError(err => {
          return of(null);
        }));
  }

  updateCustomerInformation(order: Order): Observable<any> {
    return this.http.put<any>(apiUrl + '/order/update-customer-order', {
      order_id: order.id,
      total: order.total,
      status: order.status,
      order_date: null,
      account_id: null,
      full_name: order.name,
      email: order.email,
      address: order.address,
      phone_number: order.phoneNumber,
      method: 0,
      order_items: [
        {
          order_item_id: 0,
          price: 0,
          quantity: 0,
          date_created: null,
          date_modified: null,
          product_id: null,
          order_id: null,
          size: null
        }
      ]
    }).pipe(tap(_ => console.log('Update product')),
      catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  changeStatus(orderId: string, status: number): Observable<any> {
    return this.http.put<any>(apiUrl + '/order/change-status?'
      + 'orderId=' + orderId + '&number=' + status, {})
      .pipe(tap(_ => console.log('changed status of order')),
        catchError(err => {
          console.log(err);
          return of(err);
        }));
  }

  addNewOrder(order: Order): Observable<any> {
    return this.http.post<any>(apiUrl + '/order/create-order', {
      order_id: null,
      total: 0,
      status: 0,
      order_date: null,
      account_id: null,
      full_name: order.name,
      email: order.email,
      address: order.address,
      phone_number: order.phoneNumber,
      method: 1,
      order_items: []
    })
      .pipe(tap(_ => console.log('add new order')),
        catchError(err => {
          console.log(err);
          return of(err);
        }));
  }
}
