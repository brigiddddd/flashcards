import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { StackDetailComponent } from './stacks/stack-detail.component';
import { StacksComponent } from './stacks/stacks.component';
import { StackSearchComponent } from './stacks/stack-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/stacks', pathMatch: 'full' },
  // { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: StackDetailComponent },
  { path: 'stacks', component: StacksComponent },
  { path: 'search', component: StackSearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'cards/:id', component: CardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
