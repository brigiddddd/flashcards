import { Stack } from './../models/stack';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { StacksComponent } from '../stacks/stacks.component';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  shuffledCards: string[];
  cardIndex: number;
  categoryId: string;
  stackId: string;
  stack: Stack;
  category: Category;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _router: Router
  ) {
    this.cardIndex = 0;
  }

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => {
        this.categoryId = params.get('categoryId');
        this.stackId = params.get('stackId');
        return this._categoryService.getCategory(this.categoryId);
      })
      .subscribe((category: Category) => {
        this.category = category;
        const stack = StacksComponent.getStackFromCategory(
          this.category,
          this.stackId
        );
        this.shuffledCards = this.shuffle(stack.cards);
        this.stack = stack;
      });
  }

  ngOnDestroy() {
    if (!this.category.name) {
      this._categoryService.deleteCategory(this.category).subscribe();
    }
  }

  shuffle(array: any[]): any[] {
    if (!array) {
      return [];
    }
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // ... and swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onClick(): void {
    this.cardIndex++;
  }

  replay(): void {
    this.cardIndex = 0;
    this.shuffledCards = this.shuffle(this.shuffledCards);
  }

  goBack(): void {
    this._location.back();
    // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
  }

  editStack(): void {
    this._router.navigate(['/details', this.categoryId, this.stackId]);
  }
}
