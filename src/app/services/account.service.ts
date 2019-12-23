import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getAllAccount(): Observable<any> {
    return this.http.get<any>(apiUrl + '/account')
      .pipe(tap(_ => console.log('fetched accounts')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }
}
