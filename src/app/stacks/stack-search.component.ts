import { Stack } from './../models/stack';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StackSearchService } from './../services/stack-search.service';


@Component({
    selector: 'stack-search',
    templateUrl: './stack-search.component.html',
    providers: [StackSearchService]
})
export class StackSearchComponent implements OnInit {
    stacks: Observable<Stack[]>;
    private _searchTerms = new Subject<string>();

    constructor(private _stackSearchService: StackSearchService, private _router: Router) {}

    search(term: string): void {
        this._searchTerms.next(term);
    }

    ngOnInit(): void {
        this.stacks = this._searchTerms.debounceTime(300) // wait 300 ms after each keystroke before considering the term
            .distinctUntilChanged() // if next search term is same as previous
            .switchMap(term => term // switch to new observable each time the term changes
                // return the http search observable
                ? this._stackSearchService.search(term)
                // or the observable of empty stacks if there was no search term
                : Observable.of<Stack[]>([])
            )
            .catch(error => {
                // TODO: add real error handling
                console.error(error);
                return Observable.of<Stack[]>([]);
            });
    }

    gotoDetail(stack: Stack): void {
        const link = ['/detail', stack.id];
        this._router.navigate(link);
    }
}
