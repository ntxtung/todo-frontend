import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CardList } from '../models/card-list.model';
import { ReducerState } from '../reducers/reducer';
import { Store } from '@ngrx/store';
import { addNewCardList, deleteCardList, transferCardItem, updateCardList } from '../actions/card-list.actions';
import { CardListService } from './card-list.service';

@Injectable()
export class LocalNgrxCardListService implements CardListService {

  constructor(
    private store: Store<ReducerState>
  ) { }

  getAllCardLists(): Observable<CardList[]> {
    return this.store.select('cardListReducer', 'cardLists');
  }

  createNewCardList(cardList: CardList): Observable<CardList> {
    this.store.dispatch(addNewCardList(cardList));
    return of(cardList);
  }

  updateCardList(cardList: CardList): Observable<CardList> {
    this.store.dispatch(updateCardList(cardList));
    return of(cardList);
  }

  removeCardList(cardList: CardList): Observable<CardList> {
    this.store.dispatch(deleteCardList(cardList));
    return of(cardList);
  }

  transferCardItem(previousListId: number, newListId: number, previousIndex: number, newIndex: number): Observable<boolean> {
    this.store.dispatch(transferCardItem({previousListId, newListId, previousIndex, newIndex}));
    return of(true);
  }
}
