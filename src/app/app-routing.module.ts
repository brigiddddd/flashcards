import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { StackDetailComponent } from './stacks/stack-detail.component';
import { StacksComponent } from './stacks/stacks.component';
import { StackSearchComponent } from './stacks/stack-search.component';
import { CategoryDetailComponent } from './categories/category-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/stacks', pathMatch: 'full' },
  { path: 'detail/:categoryId/:stackId', component: StackDetailComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'stacks', component: StacksComponent },
  { path: 'search', component: StackSearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'cards/:categoryId/:stackId', component: CardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
