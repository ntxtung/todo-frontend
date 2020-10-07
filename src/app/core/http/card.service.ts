import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Card} from '../../shared/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: Card[];
  constructor() {
    this.cards = [];
  }

  getCardsByListId(id: number): Observable<Card[]> {
    return of(this.cards.filter( card => card.cardListId === id));
  }

  createCard(newCard: Card): Observable<Card> {
    if (this.cards.length){
      newCard.id = this.cards[this.cards.length - 1].id + 1;
    } else {
      newCard.id = 1;
    }
    this.cards = [...this.cards, newCard];
    console.log(this.cards);
    return of(newCard);
  }
}
