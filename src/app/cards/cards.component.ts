import { Stack } from './../models/stack';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { StacksComponent } from '../stacks/stacks.component';
import 'rxjs/add/operator/mergeMap';
import { StackService } from '../services/stack.service';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {
  shuffledCards: string[];
  cardIndex: number;
  stackId: string;
  stack: Stack;
  category: Category;

  constructor(
    private _categoryService: CategoryService,
    private _stackService: StackService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _router: Router
  ) {
    this.cardIndex = 0;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.stackId = params['stackId'];
    });

    const first = this._stackService.getStack(this.stackId);
    first
      .mergeMap((stack: Stack) => {
        if (stack) {
          this.stack = stack;
          this.shuffledCards = this.shuffle(stack.cards);

          return this._categoryService.getCategory(stack.categoryId);
        } else {
          console.log('WHAT');
          return of(new Category());
        }
      })
      .subscribe((category: Category) => {
        this.category = category || new Category();
        console.log(category);
      });
  }

  ngOnDestroy() {
    if (!this.stack.name) {
      this._stackService.deleteStack(this.stack).subscribe();
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
    this._router.navigate(['/stackDetails', this.stackId]);
  }
}
