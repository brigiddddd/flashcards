import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { StackService } from './stack.service';
import { Stack } from './stack';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: string[];
  cardIndex: number;

  constructor(
    private _stackService: StackService,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.cardIndex = 0;
  }

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => this._stackService.getStack(params.get('id')))
      .subscribe(stack => this.cards = this.shuffle(stack.cards));
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
    this.cards = this.shuffle(this.cards);
  }

  goBack(): void {
    this._location.back();
    // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
  }
}
