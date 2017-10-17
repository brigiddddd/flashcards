import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Stack }           from './stack';

@Injectable()
export class StackSearchService {

  constructor(private _http: Http) {}

  search(term: string): Observable<Stack[]> {
    return this._http
               .get(`api/stacks/?title=${term}`)
               .map(response => response.json() as Stack[]);
  }
}