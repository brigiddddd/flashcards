import { Stack } from './stack';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'stack-detail',
    templateUrl: './stack-detail.component.html'
})
export class StackDetailComponent {
    @Input() stack: Stack;
}