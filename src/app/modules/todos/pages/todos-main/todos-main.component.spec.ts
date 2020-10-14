import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMainComponent } from './todos-main.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../../../shared/reducers/card.reducer';
import {cardListReducer} from '../../../../shared/reducers/card-list.reducer';
import {CardList} from '../../../../shared/models/card-list.model';
import {CardDetailComponent} from '../../components/card-detail/card-detail.component';

describe('TodosMainComponent', () => {
  let component: TodosMainComponent;
  let fixture: ComponentFixture<TodosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosMainComponent, CardDetailComponent ],
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
    fixture = TestBed.createComponent(TodosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
