import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CardList} from '../../shared/models/card-list.model';
import {ReducerState} from '../../shared/reducers/reducer';
import {Store} from '@ngrx/store';
import {addNewCardList, updateCardList} from '../../shared/actions/card-list.actions';
@Injectable({
  providedIn: 'root'
})
export class CardListService {
  cardLists: CardList[];
  constructor(
    private store: Store<ReducerState>
  ) {
    this.store.select('cardListReducer')
      .subscribe(cardListStore => {
        this.cardLists = cardListStore.cardLists;
      });
  }

  getAllCardLists(): Observable<CardList[]> {
    return this.store.select('cardListReducer', 'cardLists');
  }

  createNewCardList(cardList: CardList): Observable<CardList> {
    if (this.cardLists.length) {
      cardList.id = this.cardLists[this.cardLists.length - 1].id + 1;
    } else {
      cardList.id = 1;
    }
    this.cardLists = [...this.cardLists, cardList];
    this.store.dispatch(addNewCardList(cardList));
    return of(cardList);
  }
  updateCardList(cardList: CardList): Observable<CardList> {
    this.store.dispatch(updateCardList(cardList));
    return of(cardList);
  }
}
