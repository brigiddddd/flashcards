import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  savedCategory: Category;
  @Input() unsavedCategory: Category;
  isEditingName = false;
  isDirty = false;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._route.paramMap
      .switchMap((params: ParamMap) =>
        this._categoryService.getCategory(params.get('id'))
      )
      .subscribe(category => {
        this.savedCategory = category;
        this.unsavedCategory = Object.assign({}, category);
      });
  }

  goBack(): void {
    // TODO: PROMPT FOR SAVE
    this._location.back(); // TODO: THIS DOES NOT WORK CORRECTLY AFTER CREATE
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

  save(goBack): void {
    this._categoryService.updateCategory(this.unsavedCategory).subscribe(() => {
      if (goBack) {
        this.goBack();
      }
      //TODO: figure out saved/unsaved categories
      this.isDirty = false;
    });
  }

  trackByIndex(index: number, obj: any): number {
    return index;
  }
}
