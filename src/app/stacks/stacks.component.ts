
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStackDialogComponent } from './../add-stack-dialog/add-stack-dialog.component';
import { Stack } from '../models/stack';
import { CategoryService } from './../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  stacks: Stack[];
  categories: Category[];

  constructor(private _router: Router, public dialog: MatDialog, private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.stacks = [];
    this.getCategories();
  }

  getCategories(): void {
    console.log('getting categories');
    this._categoryService.getCategories().then(categories => this.categories = categories);
  }

  getStacks(): void {
    //this._stackService.getStacks().then(x => this.stacks = x);
    this._categoryService.getCategories().then(categories => {
      this.categories = categories;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].stacks) {
          this.stacks = this.stacks.concat(this.categories[i].stacks);
        }
      }
    });
  }

  getCategoryForStack(stack: Stack) {
    //TODO: SHOULD WE IMPORT CATEGORY SERVICE IN STACK SERVICE?
    this._categoryService.getCategory(stack.categoryId.toString());
    //.then(category => stack.category = category); //TODO
  }

  onSelect(stack: Stack, event): void {
    stack.selected = !stack.selected;
    //event.currentTarget.className += 'selected';
    // TODO:Change style on select
  }

  onPlay(category: Category, stack: Stack): void {
    this._router.navigate(['/cards', category.id, stack.id]);
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
    // TODO: REDO WITH CATEGORY SERVICE
    /*
    this._stackService.create(name).then(stack => {
      this._router.navigate(['/detail', stack.id]);
    });
    */
  }

  editStack(category: Category, stack: Stack): void {
    this._router.navigate(['/detail', category.id, stack.id]);
  }

  deleteStack(stack: Stack): void {
    //TODO: REDO WITH CATEGORY SERVICE
    /*
    this._stackService.delete(stack.id)
      .then(() => {
        this.stacks = this.stacks.filter(s => s !== stack);
      });
      */
  }

  trackByStack(index: number, stack: Stack): number {
    //TODO: WHY DID I IMPLEMENT THIS?
    return stack.id;
  }
}
