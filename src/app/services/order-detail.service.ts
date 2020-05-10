import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {OrderItem} from '../models/orderItem.model';


const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class OrderDetailService {

  constructor(private http: HttpClient) {
  }

  // GET /api/order-item/order-item-history
  getOrderDetailById(id: string): Observable<any> {
    return this.http.get<any>(apiUrl + '/order-item/order-item-history?orderId=' + id)
      .pipe(tap(_ => console.log('fetched orders')),
        catchError(err => {
          return of(null);
        }));
  }


  updateOrderDetail(orders: OrderItem[]): Observable<any> {
    let tempBody = [];
    orders.forEach(value => {

      tempBody.push({
        order_item_id: value.id ? value.id : 0,
        price: value.price,
        quantity: value.quantity,
        product_id: value.productId,
        order_id: value.orderId,
        size: value.size
      })
    });
    return this.http.put<any>(apiUrl + '/order-item/update-list-order-item', tempBody).pipe(tap(_ => console.log('Update product')),
      catchError(err => {
        console.log(err);
        return of(null);
      }));
  }
}
