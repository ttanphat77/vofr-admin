import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

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
}
