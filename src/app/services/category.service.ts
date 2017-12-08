import { Category } from './../models/category';
import { Stack } from '../models/stack';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {
  private _categoriesUrl = 'api/categories'; // URL to web api

  defaultBackgroundColor: string;
  defaultFontColor: string;

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {
    // TODO: MAKE THIS A SETTING?
    this.defaultBackgroundColor = '#fff';
    this.defaultFontColor = '#000';
  }

  private log(message: string) {
    this._messageService.add('CategoryService: ' + message);
  }
  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCategory(id: string): Observable<Category> {
    const url = `${this._categoriesUrl}/${id}`;
    return this._http
      .get<Category>(url)
      .pipe(
        tap(_ => this.log(`fetched category id = ${id}`)),
        catchError(this._handleError<Category>(`getCategory id = ${id}`))
      );
  }

  getCategories(): Observable<Category[]> {
    return this._http
      .get<Category[]>(this._categoriesUrl)
      .pipe(
        tap(heroes => this.log(`fetched categories`)),
        catchError(this._handleError('getCategories', []))
      );
  }

  // TODO!!! RE THINK THIS LOGIC
  getStack(categoryId: string, stackId: string): Promise<Stack> {
    return this.getCategory(categoryId).then(category => {
      const stacks = category.stacks;
      const stack = stacks.find(x => x.id.toString() === stackId);
      stack.categoryId = category.id;
      stack.categoryName = category.name;
      if (!stack.backgroundColor) {
        stack.backgroundColor = category.backgroundColor;
      }
      if (!stack.fontColor) {
        stack.fontColor = category.fontColor;
      }
      return stack;
    });
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${this._categoriesUrl}/${category.id}`;
    return this._http
      .put(url, category, httpOptions)
      .pipe(
        tap(_ => this.log(`updated category id = ${category.id}`)),
        catchError(this._handleError<any>('updateCategory'))
      );
  }

  addCategory(category: Category): Observable<Category> {
    return this._http
      .post<Category>(this._categoriesUrl, category, httpOptions)
      .pipe(
        tap((newCategory: Category) =>
          this.log(`added category with id = ${newCategory.id}`)
        ),
        catchError(this._handleError<Category>('addCategory'))
      );
  }
  //TODO: SHOULD WE HAVE CREATE??
  /*
  createCategory(name: string): Observable<Category> {
    return this._http
      .post(
        this._categoriesUrl,
        JSON.stringify({
          name: name,
          cards: [],
          backgroundColor: this.defaultBackgroundColor,
          fontColor: this.defaultFontColor
        }),
        { headers: this._headers }
      )
      .toPromise()
      .then(result => result.json() as Category)
      .catch(this._handleError);
  }
  */

  deleteCategory(category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this._categoriesUrl}/${id}`;
    return this._http
      .delete<Category>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted category with id = ${id}`)),
        catchError(this._handleError<Category>('deleteCategory'))
      );
  }
}
