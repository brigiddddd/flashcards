import { Stack } from './stack';

//import { STACKS } from './mock-stacks';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StackService {
    private _stacksUrl = 'api/stacks'; // URL to web api
    private _headers = new Headers({'Content-Type:': 'application/json'});

    constructor(private _http: Http) { }

    getStack(id: string): Promise<Stack> {
        //return this.getStacks().then(stacks => stacks.find(stack => stack.id === id));
        const url = `${this._stacksUrl}/${id}`;
        return this._http.get(url)
            .toPromise()
            .then(response => response.json() as Stack)
            .catch(this._handleError);
    }

    getStacks(): Promise<Stack[]> {
        //return Promise.resolve(STACKS);
        return this._http.get(this._stacksUrl)
            .toPromise()
            .then(response => response.json() as Stack[])
            .catch(this._handleError);
    }

    private _handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    update(stack: Stack): Promise<Stack> {
        const url = `${this._stacksUrl}/${stack.id}`;
        return this._http.put(url, JSON.stringify(stack), {headers: this._headers})
            .toPromise()
            .then(() => stack)
            .catch(this._handleError);
    }

    create(title: string): Promise<Stack> {
        return this._http.post(this._stacksUrl, JSON.stringify({title: title}), {headers: this._headers})
            .toPromise()
            .then(result => result.json() as Stack)
            .catch(this._handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this._stacksUrl}/${id}`
        return this._http.delete(url, {headers: this._headers})
            .toPromise()
            .then(() => null)
            .catch(this._handleError);
    }
}