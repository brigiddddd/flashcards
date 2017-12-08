import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private _categoryService: CategoryService, private _router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().then(x => this.categories = x);
  }

  addCategory(name: string) {
    if (!name) {
      console.log('No category name has been set');
      return;
    }
    this._categoryService.createCategory(name).then(category => {
      this._router.navigate(['/details', category.id]);
    });
  }

  editCategory(category: Category): void {
    this._router.navigate(['/details', category.id]);
  }

}
