import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CardList } from '../../../shared/models/card-list.model';

@Injectable()
export abstract class CardListService {
  abstract getAllCardLists(): Observable<CardList[]>;
  abstract createNewCardList(cardList: CardList): Observable<CardList>;
  abstract updateCardList(cardList: CardList): Observable<CardList>;
  abstract removeCardList(cardList: CardList): Observable<CardList>;
  abstract transferCardItem(previousListId: number, newListId: number, previousIndex: number, newIndex: number): Observable<boolean>;
}
