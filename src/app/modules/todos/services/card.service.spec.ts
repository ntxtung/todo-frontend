import { TestBed } from '@angular/core/testing';

import { LocalNgrxCardService } from './local-ngrx-card.service';
import { StoreModule } from '@ngrx/store';
import { cardReducer } from '../reducers/card.reducer';
import { cardListReducer } from '../reducers/card-list.reducer';

describe('CardService', () => {
  let service: LocalNgrxCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    });
    service = TestBed.inject(LocalNgrxCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
