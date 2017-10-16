import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { StacksComponent } from './stacks.component';
import { StackDetailComponent } from './stack-detail.component';
import { StackService } from './stack.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StackDetailComponent,
    StacksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    StackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
