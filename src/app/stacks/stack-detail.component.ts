import { CategoryService } from './../services/category.service';
import { Stack } from './../models/stack';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Category } from '../models/category';

@Component({
  selector: 'stack-detail',
  templateUrl: './stack-detail.component.html',
  styleUrls: ['./stack-detail.component.css']
})
export class StackDetailComponent implements OnInit {
  //@Input() stack: Stack;
  savedStack: Stack;
  @Input() unsavedStack: Stack;
  isEditingName = false;
  isDirty = false;
  categoryId: string;
  unsavedCategory: Category;
  category: Category; // TODO: Categories!!!

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {
    this.category = new Category();
  } // TODO: THIS IS GARBAGE

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => {
        this.categoryId = params.get('categoryId');
        return this._categoryService.getStack(
          this.categoryId,
          params.get('stackId')
        );
      })
      .subscribe(stack => {
        this.savedStack = stack;
        this.unsavedStack = Object.assign({}, stack);
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
    console.log(card); // TODO: remove this line.
    this.editCard(card);
  }

  editCard(card: string): void {
    console.log('editing card', card);
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
    this._categoryService
      .getCategory(this.categoryId)
      .then(category => {
        this.unsavedCategory = Object.assign({}, category);
        const index = category.stacks.findIndex(
          stack => this.unsavedStack.id === stack.id
        );
        this.unsavedCategory.stacks[index] = this.unsavedStack;
        console.log(this.unsavedStack);
      })
      .then(() => {
        if (this.unsavedCategory) {
          this._categoryService.update(this.unsavedCategory);
        }
      })
      .then(() => {
        if (goBack) {
          this.goBack();
        }
        //TODO: figure out saved/unsaved stacks
        this.isDirty = false;
      });
  }

  deleteStack(): void {
    //TODO!
    //TODO: warn that can't be undone.
  }

  play(): void {
    //TODO: prompt for saving
    this.save(false);
    this._router.navigate(['/cards', this.categoryId, this.savedStack.id]);
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }
}
