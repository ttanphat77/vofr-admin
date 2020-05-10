import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';


const apiUrl = environment.SOCKET_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  getAllNoti(): Observable<any> {
    return this.http.get<any>(apiUrl + '/notification')
      .pipe(tap(_ => console.log('fetched notification')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }
}
