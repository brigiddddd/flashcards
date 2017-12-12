import { CategoryService } from './../services/category.service';
import { Stack } from './../models/stack';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Category } from '../models/category';
import { CategoriesComponent } from '../categories/categories.component';
import { StacksComponent } from './stacks.component';

@Component({
  selector: 'app-stack-detail',
  templateUrl: './stack-detail.component.html',
  styleUrls: ['./stack-detail.component.css']
})
export class StackDetailComponent implements OnInit {
  @Input() unsavedStack: Stack;
  savedStack: Stack;
  stackId: string;

  newlySelectedCategory: Category;
  originalCategory: Category;
  categoryId: string;

  categories: Category[];

  isEditingName = false;
  isDirty = false;
  useCategoryColors: boolean;

  backgroundColor: string;
  fontColor: string;

  selectedCategoryId: string;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.stackId = params['stackId'];
      this.categoryId = params['categoryId'];
    });

    forkJoin(
      this._categoryService.getCategories(),
      this._categoryService.getCategory(this.categoryId)
    ).subscribe(([categories, category]) => {
      this.categories = categories;
      this.originalCategory = category;
      this.savedStack = StacksComponent.getStackFromCategory(
        category,
        this.stackId
      );
      this.unsavedStack = Object.assign({}, this.savedStack);

      this.backgroundColor =
        this.unsavedStack.backgroundColor ||
        this.originalCategory.backgroundColor;
      this.fontColor =
        this.unsavedStack.fontColor || this.originalCategory.fontColor;

      if (
        this.backgroundColor === this.originalCategory.backgroundColor &&
        this.fontColor === this.originalCategory.fontColor
      ) {
        this.useCategoryColors = true;
      }

      this.selectedCategoryId = this.originalCategory.id.toString(); //TODO: Maybe this should change or not be necessary.
    });
  }

  goBack(): void {
    // TODO: PROMPT FOR SAVE
    this._location.back();
    // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
  }

  editName(): void {
    this.isEditingName = true;
    // TODO: LOOK INTO DIRECTIVES. https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
  }

  updateName(): void {
    if (this.unsavedStack.name !== this.savedStack.name) {
      this.isDirty = true;
    }
    this.isEditingName = false;
  }

  onSelect(card: string): void {
    this.editCard(card);
  }

  editCard(card: string): void {
    this.isDirty = true;
  }

  deleteCard(card: string): void {
    const index = this.unsavedStack.cards.indexOf(card);
    if (index >= 0) {
      this.unsavedStack.cards.splice(index, 1);
    }

    this.isDirty = true;
  }

  addCard(cardContent: string): void {
    cardContent = cardContent.trim();
    if (!cardContent) {
      return;
    }

    if (!this.unsavedStack.cards) {
      this.unsavedStack.cards = [];
    }
    this.unsavedStack.cards.push(cardContent);

    (<HTMLInputElement>document.getElementById('newCardContent')).value = '';

    this.isDirty = true;
  }

  removeStackFromCategory(stack: Stack, category: Category): Observable<any> {
    console.log('StackDetailComponent: removeStackFromCategory');
    const index = category.stacks.findIndex(s => stack.id === s.id);

    if (index > -1) {
      category.stacks.splice(index, 1);

      return this._categoryService.updateCategory(category);
    } else {
      //TODO: Handle this better
      console.log(
        `stack with ${stack.id} not found in category with id ${category.id}`
      );
    }
  }

  addStackToCategory(stack: Stack, category: Category): Observable<any> {
    console.log('StackDetailComponent: addStackToCategory');
    //TODO: Stack will be saved with categoryName and categoryId
    if (!category.stacks) {
      category.stacks = [];
    }
    category.stacks.push(stack);

    return this._categoryService.updateCategory(category);
  }

  replaceStackInCategory(stack: Stack, category: Category): Observable<any> {
    console.log('StackDetailComponent: replaceStackInCategory');
    //TODO: Stack will be saved with categoryName and categoryId

    console.log('StackDetailComponent: removeStackFromCategory');
    const index = category.stacks.findIndex(s => stack.id === s.id);

    if (index > -1) {
      category.stacks[index] = stack;

      return this._categoryService.updateCategory(category);
    } else {
      //TODO: Handle this better
      console.log(
        `stack with ${stack.id} not found in category with id ${category.id}`
      );
    }
  }

  save(goBack): void {
    const observables: Observable<any>[] = [];
    if (this.newlySelectedCategory) {
      observables.push(
        this.addStackToCategory(this.unsavedStack, this.newlySelectedCategory)
      );
      observables.push(
        this.removeStackFromCategory(this.unsavedStack, this.originalCategory)
      );
    } else {
      observables.push(
        this.replaceStackInCategory(this.unsavedStack, this.originalCategory)
      );
    }

    forkJoin(observables).subscribe(() => {
      if (goBack) {
        this.goBack();
      }
      this.isDirty = false;
      if (this.newlySelectedCategory) {
        this.originalCategory = Object.assign({}, this.newlySelectedCategory);
        delete this.newlySelectedCategory;
      }

      this.savedStack = Object.assign({}, this.unsavedStack);
    });
  }

  deleteStack(): void {
    //TODO!
    //TODO: warn that can't be undone.
  }

  play(): void {
    //TODO: prompt for saving
    this.save(false);
    this._router.navigate(['/play', this.categoryId, this.savedStack.id]);
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }

  onChangeColor(): void {
    console.log('StackDetailComponent: onChangeColor');
    this.isDirty = true;
    const category = this.newlySelectedCategory || this.originalCategory;

    if (
      this.fontColor !== category.fontColor ||
      this.backgroundColor !== category.backgroundColor
    ) {
      this.useCategoryColors = false;
      this.unsavedStack.backgroundColor = this.backgroundColor;
      this.unsavedStack.fontColor = this.fontColor;
    } else {
      delete this.unsavedStack.backgroundColor;
      delete this.unsavedStack.fontColor;
    }
  }

  onChangeUseCategoryColors(): void {
    console.log('StackDetailComponent: onChangeUseCategoryColors');
    const category = this.newlySelectedCategory || this.originalCategory;

    if (this.useCategoryColors) {
      this.fontColor = category.fontColor;
      this.backgroundColor = category.backgroundColor;
    }
  }

  onSelectCategory(): void {
    console.log('StackDetailComponent: onSelectCategory');
    this.newlySelectedCategory = this.categories.find((category: Category) => {
      return this.selectedCategoryId === category.id.toString();
    });

    this.unsavedStack.categoryId = this.newlySelectedCategory.id;
    this.unsavedStack.categoryName = this.newlySelectedCategory.name;

    if (this.newlySelectedCategory.id === this.originalCategory.id) {
      delete this.newlySelectedCategory;
    } else {
      this.isDirty = true;
    }
    if (this.useCategoryColors) {
      const category = this.newlySelectedCategory || this.originalCategory;
      this.backgroundColor = category.backgroundColor;
      this.fontColor = category.fontColor;
    }
  }
}

// NOTE: IF YOU CHANGE THE CATEGORY, YOUR CURRENT URL WILL BE INCORRECT. SO YOU WOULD HAVE TO RE-ROUTE
// AND THEN SOMEHOW REMOVE THE 'BACK' FUNCTIONALITY. DO WE NEED TO REDO STACK URLS TO NOT CONTAIN CATEGORY URLS.

// TODO: USE MESSAGE SERVICE
