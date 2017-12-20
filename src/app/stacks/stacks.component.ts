import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddStackDialogComponent } from './../add-stack-dialog/add-stack-dialog.component';
import { Stack, DisplayStack } from '../models/stack';
import { CategoryService } from './../services/category.service';
import { Category } from '../models/category';
import { StackService } from '../services/stack.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {
  displayStacks: DisplayStack[];
  categories: Category[];

  numberSelectedStacks: number;

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _categoryService: CategoryService,
    private _stackService: StackService
  ) {}

  ngOnInit(): void {
    this.displayStacks = [];
    this.getDisplayStacks();
  }

  getCategories(): void {
    this._categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  getDisplayStacks(): void {
    forkJoin(
      this._stackService.getStacks(),
      this._categoryService.getCategories()
    ).subscribe(([stacks, categories]) => {
      for (const stack of stacks) {
        const category = categories.find(
          (x: Category) => x.id === stack.categoryId
        );

        const displayStack = new DisplayStack({
          id: stack.id,
          name: stack.name,
          categoryId: stack.categoryId,
          cards: stack.cards, // TODO: DEEP COPY?
          backgroundColor:
            stack.backgroundColor || category.defaultBackgroundColor,
          fontColor: stack.fontColor || category.defaultFontColor,
          categoryName: category.name
        });

        this.displayStacks.push(displayStack);
      }
    });
  }

  onSelect(stack: DisplayStack, event): void {
    stack.selected = !stack.selected;
    this.numberSelectedStacks = this.displayStacks.filter(
      (x: DisplayStack) => x.selected
    ).length;
  }

  onPlay(): void {
    console.log(`numberSelectedStacks: ${this.numberSelectedStacks}`);
    if (this.numberSelectedStacks > 1) {
      console.log(`playing multiple`);
      this.onPlayMultiple();
    } else {
      this.playStackId(this.getSelectedStack().id);
    }
  }

  onPlayMultiple() {
    const newStack = new DisplayStack({
      cards: [],
      name: 'Stacks: '
    });

    this.displayStacks.forEach(x => {
      if (x.selected === true) {
        newStack.name += `${x.name} `;
        newStack.cards = newStack.cards.concat(x.cards);
      }
    });

    this._stackService.createStack(newStack).subscribe((stack: Stack) => {
      console.log(stack.id);
      this.playStackId(stack.id);
    });
  }

  playStackId(stackId: number) {
    this._router.navigate(['/play', stackId]);
  }

  getSelectedStack(): DisplayStack {
    return this.displayStacks.find((x: DisplayStack) => x.selected);
  }

  onEditSelected(): void {
    const stack = this.getSelectedStack();
    this._router.navigate(['/stackDetails', stack.id]);
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
      //TODO
      this.createStack(result[0], result[1]);
    });
  }

  createStack(name: string, categoryId: number): void {
    if (!name) {
      return;
    }
    const stack = new Stack({
      name: name,
      cards: [],
      categoryId: categoryId,
      id: 100000
    });
    stack.name = name;
    //TODO: GetCategoryID
    this._stackService.createStack(stack).subscribe((newStack: Stack) => {
      this._router.navigate(['/stackDetails', newStack.id]); // TODO: FIX ROUTER
    });
  }

  // TODO: DELETE STACK FROM STACK DETAIL PAGE
  // deleteStack(stack: Stack): void {
  //   this._stackService.deleteStack(stack.id).subscribe(() => {
  //     this.stacks = this.stacks.filter(s => s !== stack);
  //   });
  // }

  trackByStack(index: number, stack: Stack): number {
    // Angular uses object identity to track insertions and deletions within the iterator of an ngForOf.
    // It is possible for the identities of elements to change while the data does not.
    // The Angular may tear down the entire DOM and rebuild it. (expensive)
    // If trackBy is given, Angular tracks changes by the return value of the function.
    return stack.id;
  }
}
