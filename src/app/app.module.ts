import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './modules/todos/components/card/card.component';
import { CardListComponent } from './modules/todos/components/card-list/card-list.component';
import { TodosMainComponent } from './modules/todos/pages/todos-main/todos-main.component';
import {FormsModule} from '@angular/forms';
import { CardDetailComponent } from './modules/todos/components/card-detail/card-detail.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import { cardReducer } from './shared/reducers/card.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {environment} from '../environments/environment';
import { ShadowOnHoverDirective } from './modules/todos/directives/shadow-on-hover.directive';
import {cardListReducer} from './shared/reducers/card-list.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';
import {ReducerState} from './shared/reducers/reducer';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['cardListReducer', 'cardReducer'], rehydrate: true})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    CardListComponent,
    CardComponent,
    TodosMainComponent,
    CardDetailComponent,
    ShadowOnHoverDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      cardReducer,
      cardListReducer
    }, {metaReducers}),
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
