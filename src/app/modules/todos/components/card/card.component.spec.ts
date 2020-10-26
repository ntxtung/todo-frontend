import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../reducers/card.reducer';
import {cardListReducer} from '../../reducers/card-list.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
