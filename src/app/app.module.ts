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
    StackDetailComponent,
    StacksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'stacks',
        component: StacksComponent
      }
    ])
  ],
  providers: [
    StackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
