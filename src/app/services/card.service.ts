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
export class CardService {
  private _cardsUrl = 'api/cards'; // URL to web api

  constructor(
    private _http: HttpClient,
    private _messageService: MessageService
  ) {}

  private log(message: string) {
    this._messageService.add('CardService: ' + message);
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCards(): Observable<string[]> {
    return this._http
      .get<string[]>(this._cardsUrl)
      .pipe(
        tap(cards => this.log(`fetched cards`)),
        catchError(this._handleError('getCards', []))
      );
  }
}
