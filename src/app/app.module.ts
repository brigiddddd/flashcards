import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { StacksComponent } from './stacks.component';
import { StackDetailComponent } from './stack-detail.component';
import { StackService } from './stack.service';
import { StackSearchComponent } from './stack-search.component';
import { CardsComponent } from './cards.component';
import { MatToolbarModule, MatGridListModule, MatCardModule, MatButtonToggleModule } from '@angular/material';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StackDetailComponent,
    StacksComponent,
    StackSearchComponent,
    CardsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  providers: [StackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
