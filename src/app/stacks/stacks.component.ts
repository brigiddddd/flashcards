
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStackDialogComponent } from './../add-stack-dialog/add-stack-dialog.component';
import { StackService } from '../services/stack.service';
import { Stack } from '../models/stack';
import { CategoryService } from './../services/category.service';

@Component({
  selector: 'stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  stacks: Stack[];

  constructor(private _stackService: StackService, private _router: Router, public dialog: MatDialog
    , private _categoryService: CategoryService //TODO: RETHINK THIS?
  ) { }

  ngOnInit(): void {
    this.getStacks();
  }

  getStacks(): void {
    this._stackService.getStacks().then(x => this.stacks = x);
  }

  getCategoryForStack(stack: Stack) {
    //TODO: SHOULD WE IMPORT CATEGORY SERVICE IN STACK SERVICE?
    this._categoryService.getCategory(stack.categoryId.toString());
      //.then(category => stack.category = category); //TODO
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
