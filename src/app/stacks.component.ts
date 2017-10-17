import { StackService } from './stack.service';
import { Component, OnInit } from '@angular/core';
import { Stack } from './stack';
import { Router } from '@angular/router';

@Component({
  selector: 'stacks',
  templateUrl: './stacks.component.html'
})
export class StacksComponent implements OnInit {
  stacks: Stack[];
  selectedStack: Stack;

  constructor(private _stackService: StackService, private _router: Router) { }

  ngOnInit(): void {
    this.getStacks();
  }

  getStacks(): void {
    this._stackService.getStacks().then(x => this.stacks = x);
  }

  onSelect(stack: Stack): void {
    this.selectedStack = stack;
    this._router.navigate(['/detail', this.selectedStack.id]);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this._stackService.create(title)
      .then(stack => {
        this.stacks.push(stack);
        this.selectedStack = null;
      })
  }

  delete(stack: Stack): void {
    this._stackService.delete(stack.id)
      .then(() => {
        this.stacks = this.stacks.filter(s => s != stack);
        if (this.selectedStack === stack) {
          this.selectedStack = null;
        }
      });
  }
}