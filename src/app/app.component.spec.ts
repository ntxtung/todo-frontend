import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {TodosMainComponent} from './modules/todos/components/todos-main/todos-main.component';
import {StoreModule} from '@ngrx/store';
import {cardReducer} from './modules/todos/reducers/card.reducer';
import {cardListReducer} from './modules/todos/reducers/card-list.reducer';
import {CardDetailComponent} from './modules/todos/components/card-detail/card-detail.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          cardReducer,
          cardListReducer
        })
      ],
      declarations: [
        AppComponent,
        TodosMainComponent,
        CardDetailComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title ${environment.title}`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(environment.title, 'Title does not match the environment config');
  });
});
