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
  { path: 'details/:categoryId', component: CategoryDetailComponent },
  { path: 'details/:categoryId/:stackId', component: StackDetailComponent },
  { path: 'play/:categoryId/:stackId', component: CardsComponent },
  { path: 'search', component: StackSearchComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
