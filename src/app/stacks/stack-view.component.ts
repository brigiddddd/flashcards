import { Component, Input, EventEmitter } from '@angular/core';
import { DisplayStack } from '../models/stack';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-stack-view',
  templateUrl: './stack-view.component.html',
  styleUrls: ['./stack-view.component.css']
})
export class StackViewComponent implements OnInit {
  @Input() stack: DisplayStack;
  @Input() categoryName: string;

  ngOnInit() {
    if (!this.categoryName && this.stack) {
      this.categoryName = this.stack.categoryName;
    }
  }
}
