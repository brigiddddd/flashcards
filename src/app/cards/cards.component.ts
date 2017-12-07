import { Stack } from './../models/stack';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  shuffledCards: string[];
  cardIndex: number;
  categoryId: string;
  stack: Stack;

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
        return this._categoryService.getStack(this.categoryId, params.get('stackId'));
      })
      .subscribe(stack => {
        this.shuffledCards = this.shuffle(stack.cards);
        this.stack = stack;
      });
  }

  shuffle(array: any[]): any[] {
    if (!array) { return []; }
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
    console.log(this.categoryId);
    this._router.navigate(['/detail', this.categoryId, this.stack.id]);
  }
}
