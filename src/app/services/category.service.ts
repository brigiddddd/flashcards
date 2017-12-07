import { Category } from './../models/category';
import { Stack } from '../models/stack';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
  private _categoriesUrl = 'api/categories'; // URL to web api
  private _headers = new Headers({ 'Content-Type:': 'application/json' });

  defaultBackgroundColor: string;
  defaultFontColor: string;

  constructor(private _http: Http) {
    // TODO: MAKE SETTING?
    this.defaultBackgroundColor = '#fff';
    this.defaultFontColor = '#000';
  }

  private _handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCategory(id: string): Promise<Category> {
    const url = `${this._categoriesUrl}/${id}`;
    return this._http
      .get(url)
      .toPromise()
      .then(response => response.json() as Category)
      .catch(this._handleError);
  }

  getCategories(): Promise<Category[]> {
    return this._http
      .get(this._categoriesUrl)
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this._handleError);
  }

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

  update(category: Category): Promise<Category> {
    const url = `${this._categoriesUrl}/${category.id}`;
    return this._http
      .put(url, JSON.stringify(category), { headers: this._headers })
      .toPromise()
      .then(() => category)
      .catch(this._handleError);
  }

  create(name: string): Promise<Category> {
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

  delete(id: number): Promise<void> {
    const url = `${this._categoriesUrl}/${id}`;
    return this._http
      .delete(url, { headers: this._headers })
      .toPromise()
      .then(() => null)
      .catch(this._handleError);
  }
}
