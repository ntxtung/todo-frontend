import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../shared/reducers/card.reducer';
import {cardListReducer} from '../../shared/reducers/card-list.reducer';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
