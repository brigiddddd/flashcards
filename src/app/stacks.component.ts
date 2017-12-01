import { StackService } from './stack.service';
import { Component, OnInit } from '@angular/core';
import { Stack } from './stack';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStackDialogComponent } from './add-stack-dialog/add-stack-dialog.component';

@Component({
  selector: 'stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  stacks: Stack[];

  constructor(private _stackService: StackService, private _router: Router, public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(AddStackDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createStack(result);
    });
  }

  createStack(name: string): void {
    if (!name) {
      return;
    }
    this._stackService.create(name).then(stack => {
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
