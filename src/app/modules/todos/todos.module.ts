import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { TodosMainComponent } from './components/todos-main/todos-main.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ShadowOnHoverDirective } from './directives/shadow-on-hover.directive';
import { environment } from '../../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { cardListReducer } from './reducers/card-list.reducer';
import { cardReducer } from './reducers/card.reducer';
import { Title } from '@angular/platform-browser';
import { CardListService } from './services/card-list.service';
import { LocalNgrxCardListService } from './services/local-ngrx-card-list.service';
import { CardService } from './services/card.service';
import { LocalNgrxCardService } from './services/local-ngrx-card.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['cardListReducer', 'cardReducer'], rehydrate: true})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    CardListComponent,
    CardComponent,
    TodosMainComponent,
    CardDetailComponent,
    ShadowOnHoverDirective
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      cardReducer,
      cardListReducer
    }, {metaReducers}),
    FormsModule,
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
  exports: [
    TodosMainComponent
  ],
  bootstrap: []
})

export class TodosModule {
}
