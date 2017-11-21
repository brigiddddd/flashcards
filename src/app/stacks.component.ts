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
  isAdding: boolean;

  constructor(private _stackService: StackService, private _router: Router) { }

  ngOnInit(): void {
    this.getStacks();
    this.isAdding = false;
  }

  getStacks(): void {
    this._stackService.getStacks().then(x => this.stacks = x);
  }

  onSelect(stack: Stack): void {
    console.log(stack.cards);
    this._router.navigate(['/cards', stack.id]);
  }

  addStack(): void {
    this.isAdding = true;
  }

  createStack(title: string): void {
    console.log('CREATE STACK');
    console.log(title);
    console.log(typeof(title));
    title = title.trim();
    if (!title) {
      // TODO: Handle with error message?
      this.isAdding = false;
      return;
    }
    this._stackService.create(title).then(stack => {
      this.isAdding = false;
      this._router.navigate(['/detail', stack.id]);
    });
  }

  editStack(stack: Stack): void {
    this._router.navigate(['/detail', stack.id]);
  }

  deleteStack(stack: Stack): void {
    this._stackService.delete(stack.id)
      .then(() => {
        this.stacks = this.stacks.filter(s => s !== stack);
      });
  }

  trackByStack(index: number, stack: Stack): number {
    return stack.id;
  }
}
