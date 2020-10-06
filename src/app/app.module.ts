import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './modules/todos/components/card/card.component';
import { CardListComponent } from './modules/todos/components/card-list/card-list.component';
import { TodosMainComponent } from './modules/todos/pages/todos-main/todos-main.component';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CardComponent,
    TodosMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
