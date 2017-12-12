import { CategoryService } from './../services/category.service';
import { Stack } from './../models/stack';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
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

  unsavedCategory: Category;
  savedCategory: Category;
  categoryId: string;

  isEditingName = false;
  isDirty = false;
  useCategoryColors: boolean;

  backgroundColor: string;
  fontColor: string;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => {
        this.stackId = params.get('stackId');
        this.categoryId = params.get('categoryId');
        return this._categoryService.getCategory(params.get('categoryId'));
      })
      .subscribe((category: Category) => {
        this.savedCategory = category;
        this.unsavedCategory = Object.assign({}, this.savedCategory);
        this.savedStack = StacksComponent.getStackFromCategory(
          category,
          this.stackId
        );
        this.unsavedStack = Object.assign({}, this.savedStack);
        if (
          this.unsavedStack.fontColor === undefined &&
          this.unsavedStack.backgroundColor === undefined
        ) {
          this.useCategoryColors = true;
          this.unsavedStack.backgroundColor = this.unsavedCategory.backgroundColor;
          this.unsavedStack.fontColor = this.unsavedCategory.fontColor;
        }
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

  save(goBack): void {
    if (this.unsavedCategory) {
      if (this.useCategoryColors) {
        delete this.unsavedStack.backgroundColor;
        delete this.unsavedStack.fontColor;
      } else {
        this.unsavedStack.backgroundColor = this.backgroundColor;
        this.unsavedStack.fontColor = this.fontColor;
      }
      const index = this.savedCategory.stacks.findIndex(
        stack => this.unsavedStack.id === stack.id
      );
      this.unsavedCategory.stacks[index] = this.unsavedStack;
      console.log(this.unsavedCategory.stacks[index]);

      this._categoryService
        .updateCategory(this.unsavedCategory)
        .subscribe(() => {
          if (goBack) {
            this.goBack();
          }
          //TODO: figure out saved/unsaved stacks and categories.
          this.isDirty = false;
        });
    }
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
    this.isDirty = true;

    if (
      this.fontColor !== this.unsavedCategory.fontColor ||
      this.backgroundColor !== this.unsavedCategory.backgroundColor
    ) {
      this.useCategoryColors = false;
    }
  }

  onChangeUseCategoryColors(): void {
    if (this.useCategoryColors) {
      this.fontColor = this.unsavedCategory.fontColor;
      this.backgroundColor = this.unsavedCategory.backgroundColor;
    }
  }
}

// NOTE: IF YOU CHANGE THE CATEGORY, YOUR CURRENT URL WILL BE INCORRECT. SO YOU WOULD HAVE TO RE-ROUTE
// AND THEN SOMEHOW REMOVE THE 'BACK' FUNCTIONALITY. DO WE NEED TO REDO STACK URLS TO NOT CONTAIN CATEGORY URLS.

// TODO: USE MESSAGE SERVICE
