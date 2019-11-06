import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })

export class ProductImageService {
    constructor(
        private http: HttpClient) {
    }

    getImagesByProductId(id, type): Observable<any> {
        return this.http.get<any>(apiUrl + '/product-image/get-list-img?type=' + type + '&id=' + id)
            .pipe(tap(_ => console.log()),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }

    addImage(productId, imgUrl, type): Observable<any> {
        return this.http.post<any>(apiUrl + '/product-image/create-image', {
            image_url: imgUrl,
            product_id: productId,
            image_type: type,
        }).pipe(tap(_ => console.log()),
            catchError(err => {
                console.log(err);
                return of(null);
            }));
    }

    deleteImage(id): Observable<any> {
        return this.http.post<any>(apiUrl + '/product-image/delete-image?imageId=' + id, {})
            .pipe(tap(_ => console.log()),
                catchError(err => {
                    console.log(err);
                    return of(null);
                }));
    }
}