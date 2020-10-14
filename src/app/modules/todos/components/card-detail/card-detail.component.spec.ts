import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailComponent } from './card-detail.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../../../shared/reducers/card.reducer';
import {cardListReducer} from '../../../../shared/reducers/card-list.reducer';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDetailComponent ],
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
    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
