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
  { path: 'stacks', component: StacksComponent },
  { path: 'categoryDetails/:categoryId', component: CategoryDetailComponent },
  { path: 'stackDetails/:stackId', component: StackDetailComponent },
  { path: 'play/:stackId', component: CardsComponent },
  { path: 'search', component: StackSearchComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
