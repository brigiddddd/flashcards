import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StacksComponent } from './stacks.component';
import { StackDetailComponent } from './stack-detail.component';
import { StackSearchComponent } from './stack-search.component';
import { CardsComponent } from './cards.component';
import { SettingsComponent } from './settings/settings.component';

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
