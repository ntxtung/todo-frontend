import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CardList} from '../../shared/models/card-list.model';
@Injectable({
  providedIn: 'root'
})
export class CardListService {
  cardLists: CardList[];
  constructor() {
    this.cardLists = [];
  }

  getAllCardLists(): Observable<CardList[]> {
    return of(this.cardLists);
  }

  createNewCardList(cardList: CardList): Observable<CardList> {
    if (this.cardLists.length) {
      cardList.id = this.cardLists[this.cardLists.length - 1].id + 1;
    } else {
      cardList.id = 1;
    }
    this.cardLists = [...this.cardLists, cardList];
    return of(cardList);
  }

  updateCardListTitle(cardListId: number, newTitle: string): Observable<CardList> {
    const objIndex = this.cardLists.findIndex((
      cardList => cardList.id === cardListId
    ));
    this.cardLists[objIndex].name = newTitle;
    return of(this.cardLists[objIndex]);
  }
}
