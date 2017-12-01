import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().then(x => this.categories = x);
  }

  addCategory(name: string) {
    if (!name) {
      return;
    }
    this._categoryService.create(name).then(category => {
      //TODO
    });
  }

}
