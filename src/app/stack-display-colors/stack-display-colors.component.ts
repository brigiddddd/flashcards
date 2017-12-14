import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stack } from './../models/stack';
import { Category } from './../models/category';

@Component({
  selector: 'app-stack-display-colors',
  templateUrl: './stack-display-colors.component.html',
  styleUrls: ['./stack-display-colors.component.css']
})
export class StackDisplayColorsComponent implements OnInit {
  backgroundColorValue: string;
  fontColorValue: string;

  mockStack: Stack;
  @Input() categoryName: string;

  @Output() backgroundColorChange = new EventEmitter<string>();
  @Output() fontColorChange = new EventEmitter<string>();
  @Output() eitherColorChange = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {
    this.createMockStack();
  }

  createMockStack() {
    this.mockStack = new Stack();
    this.mockStack.backgroundColor = this.backgroundColor;
    this.mockStack.fontColor = this.fontColor;
    this.mockStack.name = 'Sample Stack';
    this.mockStack.cards = ['card', 'data', 'will', 'show', 'up', 'here'];
  }

  @Input()
  get backgroundColor(): string {
    return this.backgroundColorValue;
  }

  @Input()
  get fontColor(): string {
    return this.fontColorValue;
  }

  set backgroundColor(color: string) {
    const originalColorValue = this.backgroundColorValue;

    this.backgroundColorValue = color;
    this.backgroundColorChange.emit(this.backgroundColorValue);

    if (originalColorValue && originalColorValue !== color) {
      this.eitherColorChange.emit(true);
    }

    if (this.mockStack) {
      this.mockStack.backgroundColor = this.backgroundColor;
    }
  }

  set fontColor(color: string) {
    const originalColorValue = this.fontColorValue;

    this.fontColorValue = color;
    this.fontColorChange.emit(this.fontColorValue);

    if (originalColorValue && originalColorValue !== color) {
      this.eitherColorChange.emit(true);
    }

    if (this.mockStack) {
      this.mockStack.fontColor = this.fontColor;
    }
  }
}
