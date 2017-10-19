import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { StackService } from './stack.service';
import { Stack } from './stack';

@Component({
  selector: 'stack-detail',
  templateUrl: './stack-detail.component.html'
})
export class StackDetailComponent implements OnInit {
  @Input() stack: Stack;

  constructor(
    private _stackService: StackService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => this._stackService.getStack(params.get('id')))
      .subscribe(stack => this.stack = stack);
  }

  goBack(): void {
    this._location.back();
    // TODO: CanDeactivate guard (https://angular.io/api/router/CanDeactivate)
  }

  onSelect(card: string): void {
    console.log(card); // TODO: remove this line.
    this.editCard(card);
  }

  editCard(card: string): void {
    // TODO: figure out how to edit
  }

  deleteCard(card: string): void {
    const index = this.stack.cards.indexOf(card);
    if (index) {
      this.stack.cards.splice(index, 1);
    }
  }

  addCard(cardContent: string): void {
    cardContent = cardContent.trim();
    if (!cardContent) { return; }

    if (!this.stack.cards) {
      this.stack.cards = [];
    }
    this.stack.cards.push(cardContent);
  }

  save(): void {
    this._stackService.update(this.stack)
      .then(() => this.goBack());
  }

  play(): void {
    this._router.navigate(['/cards', this.stack.id]);
  }
}
