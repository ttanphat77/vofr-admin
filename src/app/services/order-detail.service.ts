import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class OrderDetailService {

  constructor(private http: HttpClient) {
  }

  getOrderDetailById(id: string): Observable<any> {
    return this.http.get<any>(apiUrl + '/order-item?orderId=' + id)
      .pipe(tap(_ => console.log('fetched orders')),
        catchError(err => {
          return of(null);
        }));
  }
}
