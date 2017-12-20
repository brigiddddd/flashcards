import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError } from 'rxjs/operators';

import { Stack } from './../models/stack';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StackService {
  private _stacksUrl = 'api/stacks'; // URL to web api

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {}

  private log(message: string) {
    this._messageService.add('StackService: ' + message);
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getStack(id: string | number): Observable<Stack> {
    const url = `${this._stacksUrl}/${id}`;
    return this._http
      .get<Stack>(url)
      .pipe(
        tap(_ => this.log(`fetched stack id = ${id}`)),
        catchError(this._handleError<Stack>(`getStack id = ${id}`))
      );
  }

  getStacks(): Observable<Stack[]> {
    return this._http
      .get<Stack[]>(this._stacksUrl)
      .pipe(
        tap(stacks => this.log(`fetched stacks`)),
        catchError(this._handleError('getStacks', []))
      );
  }

  updateStack(stack: Stack): Observable<any> {
    const url = `${this._stacksUrl}/${stack.id}`;
    return this._http
      .put(url, stack, httpOptions)
      .pipe(
        tap(_ => this.log(`updated stack id = ${stack.id}`)),
        catchError(this._handleError<any>('updateStack'))
      );
  }

  createStack(stack: Stack): Observable<Stack> {
    return this._http
      .post(this._stacksUrl, stack, httpOptions)
      .pipe(
        tap((newStack: Stack) =>
          this.log(`added stack with id = ${newStack.id}`)
        ),
        catchError(this._handleError<Stack>('createStack'))
      );
  }

  deleteStack(stack: Stack | number): Observable<Stack> {
    const id = typeof stack === 'number' ? stack : stack.id;
    const url = `${this._stacksUrl}/${id}`;
    return this._http
      .delete<Stack>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted stack with id = ${id}`)),
        catchError(this._handleError<Stack>('deleteStack'))
      );
  }
}
