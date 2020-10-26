import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './modules/todos/components/card/card.component';
import { CardListComponent } from './modules/todos/components/card-list/card-list.component';
import { TodosMainComponent } from './modules/todos/components/todos-main/todos-main.component';
import { FormsModule } from '@angular/forms';
import { CardDetailComponent } from './modules/todos/components/card-detail/card-detail.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { cardReducer } from './modules/todos/reducers/card.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { ShadowOnHoverDirective } from './modules/todos/directives/shadow-on-hover.directive';
import { cardListReducer } from './modules/todos/reducers/card-list.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardListService } from './modules/todos/services/card-list.service';
import { LocalNgrxCardListService } from './modules/todos/services/local-ngrx-card-list.service';
import { CardService } from './modules/todos/services/card.service';
import { LocalNgrxCardService } from './modules/todos/services/local-ngrx-card.service';

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
    BrowserAnimationsModule,
    StoreModule.forRoot({
      cardReducer,
      cardListReducer
    }, {metaReducers}),
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    // Redux DevTool config
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }) : [],
  ],
  providers: [
    Title,
    {
      provide: CardListService,
      useClass: LocalNgrxCardListService
    },
    {
      provide: CardService,
      useClass: LocalNgrxCardService
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
