import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../../shared/models/card.model';
import { Store } from '@ngrx/store';
import { ReducerState } from '../../../shared/reducers/reducer';
import { addNewCard, updateCard, deleteCard } from '../../../shared/actions/card.actions';
import { CardService } from './card.service';

@Injectable()
export class LocalNgrxCardService implements CardService {
  cards: Card[];

  constructor(
    private store: Store<ReducerState>
  ) {
    this.store.select('cardReducer')
      .subscribe(cardStore => {
        this.cards = cardStore.cards;
      });
  }

  createCard(newCard: Card): Observable<Card> {
    if (this.cards.length) {
      newCard.id = this.cards[this.cards.length - 1].id + 1;
    } else {
      newCard.id = 1;
    }
    this.store.dispatch(addNewCard(newCard));
    return of(newCard);
  }

  updateCard(newCard: Card): Observable<Card> {
    this.store.dispatch(updateCard(newCard));
    return of(newCard);
  }

  removeCard(card: Card): Observable<Card> {
    this.store.dispatch(deleteCard(card));
    return of(card);
  }
}
