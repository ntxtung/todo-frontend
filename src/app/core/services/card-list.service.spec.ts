import { TestBed } from '@angular/core/testing';

import { CardListService } from './card-list.service';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../shared/reducers/card.reducer';
import {cardListReducer} from '../../shared/reducers/card-list.reducer';

describe('CardListService', () => {
  let service: CardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    });
    service = TestBed.inject(CardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
