import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import { Account } from "../models/account.model";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {tokenName} from "@angular/compiler";
import {Router} from "@angular/router";

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private token: string;

  constructor(private http: HttpClient,
    private authService: NbAuthService,
             ) {

    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.token = token.getValue();
    })
}

  getUserById(id): Observable<any> {
    return this.http.get<any>(apiUrl + '/account?id=' + id)
      .pipe(tap(_ => console.log('get account information')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
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

  deleteAccount(id: string): Observable<any> {
    return this.http.put<any>(apiUrl + '/account/delete-account?id=' + id + '&param=true', {})
      .pipe(tap(_ => console.log('Delete Account')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }


  addNewAccount(account: Account): Observable<any> {
    return this.http.post<any>(apiUrl + '/account/create-account', {
      account_id: null,
      first_name: account.firstName,
      last_name: account.lastName,
      email: account.email,
      address: account.address,
      phone_number: account.phoneNumber,
      username: account.username,
      password: "123456",
      role_id: 3,
      role_name: "Cashier",
      image_user: "https://cdn1.vectorstock.com/i/1000x1000/19/45/user-avatar-icon-sign-symbol-vector-4001945.jpg"
    }).pipe(tap(_ => console.log('Create Account')),
      catchError(err => {
        console.log(err);
        return of(err);
      }));
  }


  changeRole(id: string, roleId: number) {
    return this.http.put<any>(apiUrl + '/account/change-role-account?'
      + 'id=' + id + '&roleId=' + roleId, {})
      .pipe(tap(_ => console.log('changed role')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }

  changePassword(oldPass: string, newPass: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer '+this.token})
    };
    return this.http.put<any>(apiUrl + '/account/change-password?'
      + 'password=' + oldPass + '&passwordNew=' + newPass, {}, httpOptions)
      .pipe(tap(_ => console.log('changed password')),
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
