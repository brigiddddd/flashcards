import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { StackService } from './stack.service';
import { Stack }        from './stack';

@Component({
    selector: 'stack-detail',
    templateUrl: './stack-detail.component.html'
})
export class StackDetailComponent implements OnInit{
    @Input() stack: Stack;

    constructor (
        private _stackService: StackService, 
        private _route: ActivatedRoute, 
        private _location: Location
    ) {}

    ngOnInit(): void {
        this._route.paramMap
            .switchMap( (params:ParamMap) => this._stackService.getStack(params.get('id')))
            .subscribe(stack => this.stack = stack);
    }

    goBack(): void {
        this._location.back();
        // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
    }

    save(): void {
        this._stackService.update(this.stack)
            .then(() => this.goBack());
    }
}