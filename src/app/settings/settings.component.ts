import { Component, OnInit } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  categories: [Category];

  constructor() { }

  ngOnInit() {
    this.categories = [
      { id: 0, name: 'sight words', color: 'steelblue' },
      { id: 0, name: 'math facts', color: 'aquamarine' },
      { id: 2, name: 'grammar', color: 'lightseagreen' }
    ];
  }

  editCategory(category: Category) {
      //this._router.navigate(['/category', category.id]);
    alert('Sorry, this feature is not yet implemented.');
  }

}
