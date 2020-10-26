import { TestBed } from '@angular/core/testing';

import { LocalNgrxCardListService } from './local-ngrx-card-list.service';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../../shared/reducers/card.reducer';
import {cardListReducer} from '../../../shared/reducers/card-list.reducer';

describe('CardListService', () => {
  let service: LocalNgrxCardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    });
    service = TestBed.inject(LocalNgrxCardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
