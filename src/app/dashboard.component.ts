import { StackService } from './stack.service';
import { Stack } from './stack';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
    stacks: Stack[] = [];

    constructor(private _stackService: StackService) {}

    ngOnInit(): void {
        this._stackService.getStacks()
            .then(stacks => this.stacks = stacks);// stacks.slice(0,3));
    }
}