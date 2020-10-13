import { TestBed } from '@angular/core/testing';

import { CardListService } from './card-list.service';

describe('CardListService', () => {
  let service: CardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
