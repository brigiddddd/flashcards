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
import {
  MatToolbarModule, MatGridListModule, MatCardModule, MatButtonToggleModule, MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { SettingsComponent } from './settings/settings.component';
import { AutofocusDirective } from './autofocus.directive';
import { AddStackDialogComponent } from './add-stack-dialog/add-stack-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StackDetailComponent,
    StacksComponent,
    StackSearchComponent,
    CardsComponent,
    SettingsComponent,
    AutofocusDirective,
    AddStackDialogComponent
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
    MatButtonToggleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [StackService],
  bootstrap: [AppComponent],
  entryComponents: [AddStackDialogComponent]
})
export class AppModule { }
