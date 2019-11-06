import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })

export class ProductService {
    constructor(
        private http: HttpClient) {
    }

    getAllProduct(): Observable<any> {
        return this.http.get<any>(apiUrl + '/product')
            .pipe(tap(_ => console.log('fetched products')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    changeStatus(productId, active): Observable<any> {
        return this.http.put<any>(apiUrl + '/product/active-product?'
            + 'productId=' + productId + '&param=' + active, {})
            .pipe(tap(_ => console.log('changed status')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }
}
