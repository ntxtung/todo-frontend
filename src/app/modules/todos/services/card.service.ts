import { Card } from '../../../shared/models/card.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export abstract class CardService {
  abstract createCard(newCard: Card): Observable<Card>;
  abstract updateCard(newCard: Card): Observable<Card>;
  abstract removeCard(card: Card): Observable<Card>;
}
