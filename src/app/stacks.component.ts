import { StackService } from './stack.service';
import { Component, OnInit } from '@angular/core';
import { Stack } from './stack';
import { Router } from '@angular/router';

@Component({
  selector: 'stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  stacks: Stack[];
  selectedStack: Stack;
  
  constructor(private _stackService: StackService, private _router: Router) {}

  ngOnInit(): void {
    this.getStacks();
  }

  getStacks(): void {
    this._stackService.getStacks().then(x => this.stacks = x);
  }

  onSelect(stack: Stack): void {
    this.selectedStack = stack;
    this._router.navigate(['/stack', this.selectedStack.title]);
  }
}
