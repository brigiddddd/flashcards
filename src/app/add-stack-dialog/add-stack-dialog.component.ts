import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Category } from '../models/category';

@Component({
  selector: 'app-add-stack-dialog',
  templateUrl: './add-stack-dialog.component.html',
  styleUrls: ['./add-stack-dialog.component.css']
})
export class AddStackDialogComponent {
  name: string;
  @Input() categories: Category[];
  selectedCategoryId: string;
  selectedCategory: Category;

  constructor(public dialogRef: MatDialogRef<AddStackDialogComponent>) {
    this.selectedCategory = new Category();
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickOkay(): void {
    this.name = this.name ? this.name.trim() : '';
    if (!this.name) {
      // TODO: Handle with error message?
      console.log('No name entered');
      return;
    }

    if (!this.selectedCategory) {
      // TODO: Handle with error message?
      console.log('No category selected. Please select a category');
      return;
    }
    console.log('dialog ref close');
    this.dialogRef.close(this.name);
  }

  onSelect(): void {
    this.selectedCategory = this.categories.find((category: Category) => {
      return this.selectedCategoryId === category.id.toString();
    });
  }

}
