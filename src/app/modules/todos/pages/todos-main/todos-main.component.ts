import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CardListService} from '../../../../core/services/card-list.service';
import {CardList} from '../../../../shared/models/card-list.model';
import {ReducerState} from '../../../../shared/reducers/reducer';
import {Store} from '@ngrx/store';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.sass'],
  animations: [
    trigger('flyInOut', [
      state('in',
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          transform: 'translateX(70%)',
          opacity: 0
        }),
        animate(200 )
      ]),
      transition('* => void', [
        animate(200, style({
          transform: 'translateX(120%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TodosMainComponent implements OnInit {
  cardLists: CardList[];
  newCardList: CardList;

  isNewCardListTyping = false;

  constructor(
    private cardListService: CardListService,
    private store: Store<ReducerState>
  ) {
    // this.store.select('cardListReducer')
    //   .subscribe(cardListStore => this.cardLists = cardListStore.cardLists);
    this.cardListService.getAllCardLists()
      .subscribe(cardLists => this.cardLists = cardLists);
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  initNewCardList(): void {
    this.newCardList = new CardList();
  }

  refreshAll(): void {
    this.initNewCardList();
  }

  onNewCardClicked(): void {
    this.isNewCardListTyping = true;
  }

  onNewCardListEnter(): void {
    this.newCardListSubmit();
  }

  onNewCardListEscape(): void {
    this.newCardListCancel();
  }

  newCardListSubmit(): void {
    if (this.newCardList.name.trim().length) {
      let returnedCardList = null;
      this.cardListService.createNewCardList(this.newCardList)
        .subscribe(cardList => returnedCardList = cardList);
      if (returnedCardList) {
        this.isNewCardListTyping = false;
        this.refreshAll();
      } else {
        console.log('ERROR');
      }
    }
  }

  newCardListCancel(): void {
    this.isNewCardListTyping = false;
  }

  cardListIdentify(index: number, item: CardList): any {
    return item.id;
  }
}
