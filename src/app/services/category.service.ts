import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {
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
        return of(null);
      }));
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put<any>(apiUrl + '/category/update-category', {
      category_id: category.id,
      category_name: category.name,
      category_image: category.imageUrl,
      master_category_id: category.masterCategoryId,
    })
      .pipe(tap(), catchError(err => {
        return of(null);
      }));
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post<any>(apiUrl + '/category/create-category', {
      category_name: category.name,
      master_category_id: category.masterCategoryId
    })
      .pipe(tap(), catchError(err => {
        console.log(err);
        return of(null);
      }));
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.put<any>(apiUrl + '/category/delete-category?id=' + id + '&param=true', {})
      .pipe(tap(), catchError(err => {
        console.log(err);
        return of(null);
      }));
  }
}
