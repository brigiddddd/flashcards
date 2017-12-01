import { CategoryService } from './category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './category';

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
