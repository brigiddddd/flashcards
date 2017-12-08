import { CategoryDetailComponent } from './categories/category-detail.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { StacksComponent } from './stacks/stacks.component';
import { StackDetailComponent } from './stacks/stack-detail.component';
import { StackSearchComponent } from './stacks/stack-search.component';
import { CardsComponent } from './cards/cards.component';
import {
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule
} from '@angular/material';
import { SettingsComponent } from './settings/settings.component';
import { AddStackDialogComponent } from './add-stack-dialog/add-stack-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './services/category.service';
import { AutofocusDirective } from './directives/autofocus.directive';

import 'hammerjs';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerWrapperComponent } from './color-picker-wrapper/color-picker-wrapper.component';
import { StackDisplayColorsComponent } from './stack-display-colors/stack-display-colors.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    StackDetailComponent,
    StacksComponent,
    StackSearchComponent,
    CardsComponent,
    SettingsComponent,
    AutofocusDirective,
    AddStackDialogComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    ColorPickerWrapperComponent,
    StackDisplayColorsComponent,
    MessagesComponent
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
    MatProgressSpinnerModule,
    ColorPickerModule,
    MatSlideToggleModule
  ],
  providers: [CategoryService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [AddStackDialogComponent]
})
export class AppModule {}
