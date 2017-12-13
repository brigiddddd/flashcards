import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Stack } from '../models/stack';

@Component({
  selector: 'app-stack-view',
  templateUrl: './stack-view.component.html',
  styleUrls: ['./stack-view.component.css']
})
export class StackViewComponent {
  @Input() stack: Stack;
  @Output() stackChange = new EventEmitter<Stack>();
}
