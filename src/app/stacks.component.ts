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

  constructor(private _stackService: StackService, private _router: Router) { }

  ngOnInit(): void {
    this.getStacks();
  }

  getStacks(): void {
    this._stackService.getStacks().then(x => this.stacks = x);
  }

  onSelect(stack: Stack): void {
    console.log(stack.cards);
    this._router.navigate(['/cards', stack.id]);
  }

  addStack(): void {
    this._stackService.create('New Stack').then(stack => {
      this._router.navigate(['/detail', stack.id]);
    });
  }

  /*
  addStack(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this._stackService.create(title)
      .then(stack => {
        this.stacks.push(stack);
        this._router.navigate(['/detail', stack.id]);
      });
  }
  */

  editStack(stack: Stack): void {
    this._router.navigate(['/detail', stack.id]);
  }

  deleteStack(stack: Stack): void {
    this._stackService.delete(stack.id)
      .then(() => {
        this.stacks = this.stacks.filter(s => s !== stack);
      });
  }
}
