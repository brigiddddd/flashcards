import { CategoryService } from './../services/category.service';
import { Stack, DisplayStack } from './../models/stack';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Category } from '../models/category';
import { CategoriesComponent } from '../categories/categories.component';
import { StacksComponent } from './stacks.component';
import { StackService } from '../services/stack.service';

@Component({
  selector: 'app-stack-detail',
  templateUrl: './stack-detail.component.html',
  styleUrls: ['./stack-detail.component.css']
})
export class StackDetailComponent implements OnInit {
  @Input() displayStack: DisplayStack;
  private _savedStack: Stack; // TODO: VERIFY THIS IS NECESSARY?

  categories: Category[];
  category: Category;

  isEditingName = false;
  isDirty = false;
  useCategoryColors: boolean;
  selectedCategoryId: string;

  constructor(
    private _categoryService: CategoryService,
    private _stackService: StackService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    let stackId: number;
    this._route.params.subscribe((params: Params) => {
      stackId = params['stackId'];
    });

    forkJoin(
      this._categoryService.getCategories(),
      this._stackService.getStack(stackId)
      // this._categoryService.getCategory(this.categoryId)
    ).subscribe(([categories, stack]) => {
      this.categories = categories;
      this._savedStack = new Stack({
        name: stack.name,
        id: stack.id,
        cards: stack.cards, // TODO: Deep COPY?
        backgroundColor: stack.backgroundColor,
        fontColor: stack.fontColor,
        categoryId: stack.categoryId
      });

      if (!this._savedStack.backgroundColor && !this._savedStack.fontColor) {
        this.useCategoryColors = true;
      }

      this.category = this.categories.find(
        (x: Category) => x.id === this._savedStack.categoryId
      ); // TODO: IF NO CATEGORY IS RETURNED?

      this.selectedCategoryId = this._savedStack.categoryId.toString();

      this.displayStack = new DisplayStack({
        id: this._savedStack.id,
        name: this._savedStack.name,
        categoryId: this.category.id,
        categoryName: this.category.name,
        backgroundColor:
        this._savedStack.backgroundColor ||
        this.category.defaultBackgroundColor,
        fontColor: this._savedStack.fontColor || this.category.defaultFontColor,
        cards: this._savedStack.cards
      });
    });
  }

  goBack(): void {
    // TODO: PROMPT FOR SAVE
    console.log(this._location);
    this._location.back();
    // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
  }

  editName(): void {
    this.isEditingName = true;
    // TODO: LOOK INTO DIRECTIVES. https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
  }

  updateName(): void {
    if (this.displayStack.name !== this._savedStack.name) {
      //TODO: THIS GETS SET TO DIRTY EARLY
      this.isDirty = true;
    }
    this.isEditingName = false;
  }

  onSelect(card: string): void {
    this.editCard(card);
    // TODO
  }

  editCard(card: string): void {
    this.isDirty = true;
    // TODO
  }

  deleteCard(card: string): void {
    const index = this.displayStack.cards.indexOf(card);
    if (index >= 0) {
      this.displayStack.cards.splice(index, 1);
    }

    this.isDirty = true;
  }

  addCard(cardContent: string): void {
    cardContent = cardContent.trim();
    if (!cardContent) {
      return;
    }

    if (!this.displayStack.cards) {
      this.displayStack.cards = [];
    }
    this.displayStack.cards.push(cardContent);

    (<HTMLInputElement>document.getElementById('newCardContent')).value = '';

    this.isDirty = true;
  }

  saveStack(goBack): void {
    console.log('StackDetailComponent: saveStack');
    if (this.useCategoryColors) {
      delete this.displayStack.backgroundColor;
      delete this.displayStack.fontColor;
    }
    this._stackService.updateStack(this.displayStack).subscribe(() => {
      if (goBack) {
        this.goBack();
      }
      this.isDirty = false;
      //TODO: RESET THIS.savedStack?
      this._savedStack = this.displayStack;
      this.displayStack.backgroundColor = this.displayStack.backgroundColor || this.category.defaultBackgroundColor;
      this.displayStack.fontColor = this.displayStack.fontColor || this.category.defaultFontColor;
      console.log(this.displayStack.backgroundColor);
      console.log(this.displayStack.fontColor);
    });
  }

  deleteStack(id): void {
    //TODO: warn that can't be undone.
    this._stackService.deleteStack(id).subscribe(() => {
      //TODO
    });
  }

  play(): void {
    //TODO: prompt for saving
    this.saveStack(false);
    this._router.navigate(['/play', this._savedStack.id]);
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }

  onChangeColor(): void {
    console.log('StackDetailComponent: onChangeColor');
    this.isDirty = true;

    if (
      this.displayStack.fontColor &&
      this.displayStack.backgroundColor &&
      (this.displayStack.fontColor !== this.category.defaultFontColor ||
        this.displayStack.backgroundColor !==
        this.category.defaultBackgroundColor)
    ) {
      this.useCategoryColors = false;
    }
  }

  onChangeUseCategoryColors(): void {
    console.log('StackDetailComponent: onChangeUseCategoryColors');
    console.log(`useCategoryColors: ${this.useCategoryColors}`);
    if (this.useCategoryColors) {
      this.displayStack.fontColor = this.category.defaultFontColor;
      this.displayStack.backgroundColor = this.category.defaultBackgroundColor;
    }
  }

  onSelectCategory(): void {
    console.log('StackDetailComponent: onSelectCategory');
    this.category = this.categories.find(
      (category: Category) => this.selectedCategoryId === category.id.toString()
    );

    this.displayStack.categoryId = this.category.id;
    this.displayStack.categoryName = this.category.name;

    if (this.displayStack.categoryId !== this._savedStack.categoryId) {
      //TODO: IS THIS NECESSARY? COLOR CHANGE TRIGGERS DIRTY??
      this.isDirty = true;
    }

    if (this.useCategoryColors) {
      this.displayStack.backgroundColor = this.category.defaultBackgroundColor;
      this.displayStack.fontColor = this.category.defaultFontColor;
    }
  }
}
