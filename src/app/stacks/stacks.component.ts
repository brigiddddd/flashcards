import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStackDialogComponent } from './../add-stack-dialog/add-stack-dialog.component';
import { Stack } from '../models/stack';
import { CategoryService } from './../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  stacks: Stack[];
  categories: Category[];

  numberSelectedStacks: number;

  // TODO: SHOULD THIS LIVE SOMEWHERE ELSE?
  static getStackFromCategory(category: Category, stackId: string): Stack {
    const stack: Stack = category.stacks.find(x => x.id.toString() === stackId);
    if (stack === undefined) {
      console.log(
        `no stack with id = ${stackId} was found in
         category with id = ${category.id}`
      );
      return;
    }
    stack.categoryId = category.id;
    stack.categoryName = category.name;
    return stack;
  }

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.stacks = [];
    //this.getCategories();
    this.getStacks();
  }

  getCategories(): void {
    this._categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getStacks(): void {
    this._categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        for (let i = 0; i < this.categories.length; i++) {
          const currentCategory = this.categories[i];
          const currentStacks = currentCategory.stacks;
          if (currentStacks) {
            for (let j = 0; j < currentStacks.length; j++) {
              const currentStack = currentStacks[j];
              currentStack.categoryId = currentCategory.id;
              currentStack.categoryName = currentCategory.name;
              if (!currentStack.backgroundColor) {
                currentStack.backgroundColor = currentCategory.backgroundColor;
              }
              if (!currentStack.fontColor) {
                currentStack.fontColor = currentCategory.fontColor;
              }
            }
            this.stacks = this.stacks.concat(currentStacks);
          }
        }
      });
  }

  onSelect(stack: Stack, event): void {
    stack.selected = !stack.selected;
    this.numberSelectedStacks = this.stacks.filter(
      (x: Stack) => x.selected
    ).length;
  }

  onPlay(categoryId: number, stackId: number): void {
    if (this.numberSelectedStacks === 1) {
      const stack = this.getSelectedStack();
      this._router.navigate(['/play', stack.categoryId, stack.id]);
    } else {
      this.onPlayMultiple();
    }
  }

  onPlayMultiple() {
    const newCat = new Category();
    const newStack = new Stack();
    newStack.id = 10000;

    this.stacks.forEach(x => {
      if (x.selected === true) {
        newStack.cards = newStack.cards.concat(x.cards);
      }
    });

    newCat.stacks.push(newStack);

    this._categoryService
      .addCategory(newCat)
      .subscribe((category: Category) => {
        console.log(category.id);
        console.log(category.stacks[0]);
        this._router.navigate(['/play', category.id, category.stacks[0].id]);
      });
  }

  getSelectedStack(): Stack {
    return this.stacks.find((x: Stack) => x.selected);
  }

  onEditSelected(): void {
    const stack = this.getSelectedStack();
    this._router.navigate(['/details', stack.categoryId, stack.id]);
  }

  addStack(): void {
    // TODO: ADD CATEGORY SELECTOR TO DIALOG
    const dialogRef = this.dialog.open(AddStackDialogComponent, {
      width: '250px'
    });
    const instance = dialogRef.componentInstance;
    instance.categories = this.categories;

    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
      this.createStack(result);
    });
  }

  createStack(name: string): void {
    if (!name) {
      return;
    }
    console.log('TODO: CREATE STACK');
    // TODO: REDO WITH CATEGORY(?) SERVICE
    /*
    this._stackService.create(name).then(stack => {
      this._router.navigate(['/details', category.id, stack.id]);
    });
    */
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
    // Angular uses object identity to track insertions and deletions within the iterator of an ngForOf.
    // It is possible for the identities of elements to change while the data does not.
    // The Angular may tear down the entire DOM and rebuild it. (expensive)
    // If trackBy is given, Angular tracks changes by the return value of the function.
    return stack.id;
  }
}
