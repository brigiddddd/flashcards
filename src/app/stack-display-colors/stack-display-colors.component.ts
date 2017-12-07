import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stack-display-colors',
  templateUrl: './stack-display-colors.component.html',
  styleUrls: ['./stack-display-colors.component.css']
})
export class StackDisplayColorsComponent implements OnInit {
  backgroundColorValue: string;
  fontColorValue: string;

  @Output() backgroundColorChange = new EventEmitter<string>();
  @Output() fontColorChange = new EventEmitter<string>();
  @Output() isDirty = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  @Input()
  get backgroundColor(): string {
    return this.backgroundColorValue;
  }

  @Input()
  get fontColor(): string {
    return this.fontColorValue;
  }

  set backgroundColor(color: string) {
    if (this.backgroundColorValue && this.backgroundColorValue !== color) {
      this.isDirty.emit(true);
    }

    this.backgroundColorValue = color;
    this.backgroundColorChange.emit(this.backgroundColorValue);
  }

  set fontColor(color: string) {
    if (this.fontColorValue && this.fontColorValue !== color) {
      this.isDirty.emit(true);
    }

    this.fontColorValue = color;
    this.fontColorChange.emit(this.fontColorValue);
  }
}
