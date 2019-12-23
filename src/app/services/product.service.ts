import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})

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

  searchProduct(keyword: string): Observable<any> {
    return this.http.get<any>(apiUrl + '/product/search-product-by-name?proName=' + keyword)
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

  updateProduct(product: Product): Observable<any> {
    return this.http.put<any>(apiUrl + '/product/update-product', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      description: product.description,
      category_id: product.categoryId
    }).pipe(tap(_ => console.log('Update product')),
      catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(apiUrl + '/product/create-product', {
      product_name: product.name,
      product_price: product.price,
      description: product.description,
      category_id: product.categoryId
    }).pipe(tap(_ => console.log('Create product')),
      catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.put<any>(apiUrl + '/product/delete-product?productId=' + id + '&param=true', {})
      .pipe(tap(_ => console.log('Delete product')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(apiUrl + '/product?'
      + 'id=' + id, {})
      .pipe(tap(_ => console.log('changed status')),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }
}
