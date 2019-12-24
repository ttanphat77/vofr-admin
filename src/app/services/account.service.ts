import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Product} from "../models/product.model";
import {Account} from "../models/account.model";

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

  changeStatus(accountId, active): Observable<any> {
    return this.http.put<any>(apiUrl + '/account/active-account?'
      + 'id=' + accountId + '&param=' + active, {})
      .pipe(tap(_ => console.log('changed status')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.put<any>(apiUrl + '/account/update-account', {
      account_id: account.id,
      first_name: account.firstName,
      last_name: account.lastName,
      email: account.email,
      address: account.address,
      phone_number: account.phoneNumber,
      username: account.username,
      password: account.password,
      actived: account.activated,
      role_id: account.role,
      role_name: account.roleName,
      image_user: account.image
    }).pipe(tap(_ => console.log('Update product')),
      catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.put<any>(apiUrl + '/account/delete-account?id=' + id + '&param=true', {})
      .pipe(tap(_ => console.log('Delete Account')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }
}

// {
//   "account_id": "3",
//   "first_name": "Giang",
//   "last_name": "Giang",
//   "email": "",
//   "address": "",
//   "phone_number": "",
//   "username": "",
//   "password": "",
//   "date_created": "2019-10-18T10:13:40.167",
//   "date_modified": "2019-12-23T20:30:44.51",
//   "actived": true,
//   "deleted": false,
//   "role_id": 1,
//   "role_name": "Admin",
//   "image_user": ""
// }
