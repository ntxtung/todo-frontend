import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './modules/todos/components/card/card.component';
import { CardListComponent } from './modules/todos/components/card-list/card-list.component';
import { TodosMainComponent } from './modules/todos/pages/todos-main/todos-main.component';
import {FormsModule} from '@angular/forms';
import { CardDetailComponent } from './modules/todos/components/card-detail/card-detail.component';
import { StoreModule } from '@ngrx/store';
import { cardReducer } from './shared/reducers/card.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import {ReducerState} from './shared/reducers/reducer';

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CardComponent,
    TodosMainComponent,
    CardDetailComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      cardReducer
    }),
    FormsModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
