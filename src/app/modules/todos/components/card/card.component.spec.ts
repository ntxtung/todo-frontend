import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from '../../../../shared/reducers/card.reducer';
import {cardListReducer} from '../../../../shared/reducers/card-list.reducer';
import {CardService} from '../../../../core/services/card.service';
import {AppComponent} from '../../../../app.component';
import {CardListComponent} from '../card-list/card-list.component';
import {TodosMainComponent} from '../../pages/todos-main/todos-main.component';
import {CardDetailComponent} from '../card-detail/card-detail.component';
import {ShadowOnHoverDirective} from '../../directives/shadow-on-hover.directive';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../../../app-routing.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ],
      imports: []
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
