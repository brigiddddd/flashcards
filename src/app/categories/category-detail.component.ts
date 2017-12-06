import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Color } from '../models/color';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  savedCategory: Category;
  @Input() unsavedCategory: Category;
  isEditingName = false;
  isDirty = false;
  colorKeys: string[];
  backgroundColorKey: number;
  fontColorKey: number;
  colors = Color;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {
    // this.keys = Object.keys(this.colors).filter(Number);
    this.colorKeys = Object.keys(this.colors).filter(k => !isNaN(Number(k)));
  }

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) => this._categoryService.getCategory(params.get('id')))
      .subscribe(category => {
        this.savedCategory = category;
        this.unsavedCategory = Object.assign({}, category);
        this.backgroundColorKey = this.colors[this.savedCategory.backgroundColor];
        this.fontColorKey = this.colors[this.savedCategory.fontColor];
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
    if (this.unsavedCategory.name !== this.savedCategory.name) {
      this.isDirty = true;
    }
    this.isEditingName = false;
  }

  selectBackgroundColor(event): void {
    event.currentTarget.style.backgroundColor = Color[this.backgroundColorKey];
    this.unsavedCategory.backgroundColor = Color[this.backgroundColorKey];
    this.isDirty = true;
  }

  selectFontColor(event): void {
    event.currentTarget.style.color = Color[this.fontColorKey];
    this.unsavedCategory.fontColor = Color[this.fontColorKey];
    this.isDirty = true;
  }

  save(goBack): void {
    this._categoryService.update(this.unsavedCategory)
      .then(() => {
        if (goBack) { this.goBack(); }
        //TODO: figure out saved/unsaved categories
        this.isDirty = false;
      });
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }
}
