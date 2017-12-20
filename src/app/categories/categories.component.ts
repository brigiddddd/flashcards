import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// TODO: MAKE THIS A SETTING?
const defaultBackgroundColor = '#fff';
const defaultFontColor = '#000';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(
    private _categoryService: CategoryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categoryService
      .getCategories()
      .subscribe((x: Category[]) => (this.categories = x));
  }

  addCategory(name: string) {
    if (!name) {
      console.log('No category name has been set');
      return;
    }
    const category = new Category();
    category.name = name;
    category.defaultBackgroundColor = defaultBackgroundColor;
    category.defaultFontColor = defaultFontColor;
    this._categoryService
      .addCategory(category)
      .subscribe((newCategory: Category) => {
        this._router.navigate(['/categoryDetails', newCategory.id]);
      });
  }

  editCategory(category: Category): void {
    this._router.navigate(['/categoryDetails', category.id]);
  }

  addStack(category: Category): void {
    console.log(`add stack to category ${category.id}`);
    // TODO
    // this._stackService.create(name).then(stack => {
    //   this._router.navigate(['/categoryDetails', category.id, stack.id]);
    // });
  }

  deleteCategory(category: Category): void {
    this._categoryService.deleteCategory(category).subscribe();
  }
}
