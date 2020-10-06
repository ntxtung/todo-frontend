import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CardList} from '../../shared/models/card-list';
import {CARD_LISTS} from './mock-card-list';
@Injectable({
  providedIn: 'root'
})
export class CardListService {
  constructor() { }

  getAllCardLists(): Observable<CardList[]> {
    return of(CARD_LISTS);
  }
}
