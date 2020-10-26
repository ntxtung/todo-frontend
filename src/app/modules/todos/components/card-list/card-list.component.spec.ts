import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardListComponent} from './card-list.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../reducers/card.reducer';
import {cardListReducer} from '../../reducers/card-list.reducer';
import {CardList} from '../../models/card-list.model';
import {CardComponent} from '../card/card.component';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListComponent, CardComponent],
      imports: [
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;

    component.cardList = new CardList({
      id: 1,
      name: 'List 1'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
