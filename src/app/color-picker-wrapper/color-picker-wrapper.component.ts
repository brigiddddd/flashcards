import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker-wrapper.component.html',
  styleUrls: ['./color-picker-wrapper.component.css']
})
export class ColorPickerWrapperComponent implements OnInit {
  colorValue: string;
  @Input() label: string;
  @Output() colorChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  @Input()
  get color(): string {
    return this.colorValue;
  }

  set color(color: string) {
    this.colorValue = color;
    this.colorChange.emit(this.colorValue);
  }
}
