import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })

export class CategoryService {
    constructor(
        private http: HttpClient) {
    }

    getAllCategory(): Observable<any> {
        return this.http.get<any>(apiUrl + '/category')
            .pipe(tap(_ => console.log('fetched categories')),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    getCategoryById(id): Observable<any> {
        return this.http.get<any>(apiUrl + '/category?id=' + id)
            .pipe(tap(), catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }
}